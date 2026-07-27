// JWT bearer auth per docs/3-api/2-authentication.md
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { failure } from "../shared/response";

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

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return failure(res, 401, "Authentication required.", [
      { code: "MISSING_TOKEN", message: "Authorization header must be a Bearer token." },
    ]);
  }

  const token = header.slice("Bearer ".length);
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
