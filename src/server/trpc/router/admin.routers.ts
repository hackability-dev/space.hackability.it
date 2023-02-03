import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as t from "../trpc";

const adminMiddleware = t.middleware(async ({ ctx, next }) => {
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
  setAdmin: pAdmin
    .input(
      z.object({
        id: z.string(),
        isAdmin: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          isAdmin: input.isAdmin,
        },
      });
    }),
  setAuthor: pAdmin
    .input(
      z.object({
        id: z.string(),
        isAuthor: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          isAuthor: input.isAuthor,
        },
      });
    }),
  getUsers: pAdmin
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        skip: input.skip,
        take: input.take,
      });
    }),
  getAllProjects: pAdmin
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.project.findMany({
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
  setDraft: pAdmin
    .input(
      z.object({
        projectId: z.string(),
        draft: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          draft: input.draft,
        },
      });
    }),
});
