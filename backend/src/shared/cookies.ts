import type { CookieOptions } from "express";

export const AUTH_COOKIE_NAME = "auth_token";

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000, // 24h, matches JWT expiry
};
