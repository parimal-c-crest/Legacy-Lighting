// Login + JWT issuance per docs/3-api/2-authentication.md.
// Account lockout: 5 failed attempts -> 15 minute lockout (NFR-SEC-001).
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../shared/prisma";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;
const TOKEN_EXPIRY = "24h";

export class InvalidCredentialsError extends Error {}
export class AccountLockedError extends Error {}
export class AccountInactiveError extends Error {}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  if (!user) {
    throw new InvalidCredentialsError();
  }

  if (!user.active) {
    throw new AccountInactiveError();
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new AccountLockedError();
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    const failedLoginAttempts = user.failedLoginAttempts + 1;
    const shouldLock = failedLoginAttempts >= MAX_FAILED_ATTEMPTS;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: shouldLock ? 0 : failedLoginAttempts,
        lockedUntil: shouldLock
          ? new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000)
          : user.lockedUntil,
      },
    });
    throw shouldLock ? new AccountLockedError() : new InvalidCredentialsError();
  }

  if (user.failedLoginAttempts > 0 || user.lockedUntil) {
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");

  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role.name },
    secret,
    { expiresIn: TOKEN_EXPIRY }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role.name,
    },
  };
}
