import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter, createContext } from "src/api/mod";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
