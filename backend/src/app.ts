import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRouter } from "./routes";
import { failure } from "./shared/response";
import { logger } from "./shared/logger";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
  app.use(express.json());
  app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/v1", apiRouter);

  app.use((_req, res) => failure(res, 404, "Not found."));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error("Unhandled error", { error: err });
    failure(res, 500, "Something went wrong. Please try again.");
  });

  return app;
}
