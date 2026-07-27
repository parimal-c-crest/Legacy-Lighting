// Auth token verification per docs/3-api/2-authentication.md.
// Reads the httpOnly cookie set on login (the secure path for the browser app); falls back to
// a Bearer header for API tooling (Postman/CI) where cookies aren't practical.
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { failure } from "../shared/response";
import { AUTH_COOKIE_NAME } from "../shared/cookies";

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

function extractToken(req: Request): string | undefined {
  const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
  if (cookieToken) return cookieToken;

  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice("Bearer ".length);

  return undefined;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) {
    return failure(res, 401, "Authentication required.", [
      { code: "MISSING_TOKEN", message: "No auth cookie or Bearer token present." },
    ]);
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured");
    req.user = jwt.verify(token, secret) as AuthPayload;
    next();
  } catch {
    return failure(res, 401, "Invalid or expired token.", [
      { code: "INVALID_TOKEN", message: "Token verification failed." },
    ]);
  }
}
