import * as trpc from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";
import { projectsRouter } from "./project.routers";

export const appRouter = trpc
  .router<Context>()
  .transformer(superjson)
  .merge("author.", projectsRouter);

export type AppRouter = typeof appRouter;

export { createContext } from "./context";
export type { Context };
