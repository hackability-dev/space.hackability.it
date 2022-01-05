import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { db } from "services/db";
import { z } from "zod";

const appRouter = trpc
  .router()
  .query("hello", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      return {
        msg: `hello ${input.name}`,
      };
    },
  })
  .query("projects", {
    input: z.object({
      skip: z.number(),
      take: z.number(),
    }),
    async resolve({ input: { skip, take } }) {
      const projects = await db.project.findMany({ skip, take });
      return projects;
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
});
