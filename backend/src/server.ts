import "dotenv/config";
import { createApp } from "./app";
import { logger } from "./shared/logger";

const port = process.env.PORT ?? 4000;
const app = createApp();

app.listen(port, () => {
  logger.info(`Backend listening on port ${port}`);
});
