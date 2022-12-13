import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as t from "../trpc";

const adminMiddleware = t.middleware(async ({ ctx, next, rawInput }) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

const pAdmin = t.publicProcedure.use(adminMiddleware);

export const adminRouter = t.router({
  getAllProjects: pAdmin
    .input(
      z.object({
        skip: z.number().default(0),
        take: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        where: {
          author: ctx.session.user.email,
        },
        select: {
          id: true,
          author: true,
          description: true,
          name: true,
          previewImage: true,
          draft: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        ...input,
      });
    }),
});
