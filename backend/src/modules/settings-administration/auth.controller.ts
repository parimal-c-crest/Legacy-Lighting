import type { Request, Response } from "express";
import { failure, success } from "../../shared/response";
import { logger } from "../../shared/logger";
import { AUTH_COOKIE_NAME, authCookieOptions } from "../../shared/cookies";
import { loginSchema } from "./auth.schema";
import {
  AccountInactiveError,
  AccountLockedError,
  InvalidCredentialsError,
  login,
} from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return failure(
      res,
      422,
      "Validation failed.",
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        code: "INVALID",
        message: issue.message,
      }))
    );
  }

  try {
    const result = await login(parsed.data.email, parsed.data.password);
    // Token goes in an httpOnly cookie only — never in the JSON body, so client-side JS
    // (and therefore any XSS payload) can never read it. Only non-sensitive profile data
    // is returned for the UI to display.
    res.cookie(AUTH_COOKIE_NAME, result.token, authCookieOptions);
    return success(res, { user: result.user });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return failure(res, 401, "Invalid email or password.", [
        { code: "INVALID_CREDENTIALS", message: "Email or password is incorrect." },
      ]);
    }
    if (err instanceof AccountLockedError) {
      return failure(res, 423, "Account locked. Try again in 15 minutes.", [
        { code: "ACCOUNT_LOCKED", message: "Too many failed login attempts." },
      ]);
    }
    if (err instanceof AccountInactiveError) {
      return failure(res, 403, "This account has been deactivated.", [
        { code: "ACCOUNT_INACTIVE", message: "Contact your Admin to reactivate this account." },
      ]);
    }
    logger.error("Unexpected login error", { error: err });
    return failure(res, 500, "Something went wrong. Please try again.");
  }
}

export function logoutHandler(_req: Request, res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, { path: authCookieOptions.path });
  return success(res, null);
}

export function meHandler(req: Request, res: Response) {
  if (!req.user) {
    return failure(res, 401, "Authentication required.");
  }
  return success(res, { id: req.user.sub, email: req.user.email, role: req.user.role });
}
