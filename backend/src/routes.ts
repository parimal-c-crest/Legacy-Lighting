import { Router } from "express";
import { authRouter } from "./modules/settings-administration/auth.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);

// Further module routers (requests, tasks, projects, dashboard, reports, users/master-data)
// are added in later sprints per docs/6-development/12-sprint-plan.md.
