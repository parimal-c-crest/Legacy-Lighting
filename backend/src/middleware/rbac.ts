// Role-based access control per docs/3-api/3-authorization.md and each module's 7-permissions.md
import type { NextFunction, Request, Response } from "express";
import { failure } from "../shared/response";

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return failure(res, 401, "Authentication required.", [
        { code: "MISSING_TOKEN", message: "No authenticated user on request." },
      ]);
    }
    if (!allowedRoles.includes(req.user.role)) {
      return failure(res, 403, "You do not have permission to perform this action.", [
        { code: "FORBIDDEN", message: `Requires one of: ${allowedRoles.join(", ")}.` },
      ]);
    }
    next();
  };
}
