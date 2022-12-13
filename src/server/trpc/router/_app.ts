import { router } from "../trpc";
import { adminRouter } from "./admin.routers";
import { authRouter } from "./auth";
import { authorRouter } from "./author.routers";
import { projectsFilesRouter } from "./files.routers";
import { projectsRouter } from "./project.routers";

export const appRouter = router({
  auth: authRouter,
  project: projectsRouter,
  files: projectsFilesRouter,
  author: authorRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
