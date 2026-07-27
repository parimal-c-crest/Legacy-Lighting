// Standard response envelope per docs/3-api/5-response-standards.md
import type { Response } from "express";

export function success(res: Response, data: unknown, status = 200, meta?: Record<string, unknown>) {
  return res.status(status).json({
    success: true,
    message: "",
    data,
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  });
}

export function failure(
  res: Response,
  status: number,
  message: string,
  errors: Array<{ field?: string; code: string; message: string }> = []
) {
  return res.status(status).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
}
