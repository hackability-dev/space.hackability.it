import * as trpc from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";
import { projectsRouter } from "./project.routers";
import { authorRouters } from "./author.routers";
import { userRouter } from "./user.routers";
import { projectsFilesRouter } from "./files.routers";

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("author.project.", projectsRouter)
  .merge("user.", userRouter)
  .merge("author.", authorRouters)
  .merge("project.files.", projectsFilesRouter);

export type AppRouter = typeof appRouter;

export { createContext } from "./context";
export type { Context };
