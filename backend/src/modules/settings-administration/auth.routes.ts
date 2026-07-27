import { Router } from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../../middleware/auth";
import { loginHandler, logoutHandler, meHandler } from "./auth.controller";

export const authRouter = Router();

// Per-IP limit on login attempts, independent of the per-account lockout in auth.service.ts —
// this stops distributed low-and-slow guessing across many accounts from the same source.
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
    errors: [{ code: "RATE_LIMITED", message: "Rate limit exceeded for this IP." }],
  },
});

authRouter.post("/login", loginRateLimit, loginHandler);
authRouter.post("/logout", logoutHandler);
authRouter.get("/me", requireAuth, meHandler);
