import { getSession } from "@auth0/nextjs-auth0";
import * as trpc from "@trpc/server";
import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { db } from "services/db";
import { z } from "zod";

const appRouter = trpc
  .router<Context>()
  .query("auth", {
    input: z.object({}),
    async resolve({ input, ctx }) {
      if (ctx.user) {
        return { res: "ok" };
      }
      throw new TRPCError({ code: "UNAUTHORIZED" });
    },
  })
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
  createContext,
});

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    const session = getSession(req, res);
    return session;
  }
  const user = await getUserFromHeader();

  return {
    user,
  };
}
type Context = inferAsyncReturnType<typeof createContext>;
