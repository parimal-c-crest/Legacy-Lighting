import type { Request, Response } from "express";
import { failure, success } from "../../shared/response";
import { logger } from "../../shared/logger";
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
    return success(res, result);
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
