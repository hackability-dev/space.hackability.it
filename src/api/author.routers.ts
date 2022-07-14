import { TRPCError } from "@trpc/server";
import {
  CreateProjectSchema,
  ProjectSchema,
  StepSchema,
} from "src/projects/schema";
import { getRenderedProject } from "utils/getRenderedProject";
import { z } from "zod";
import { createRouter } from "./router";
import path from "path";

export const authorRouters = createRouter()
  .middleware(async ({ ctx, next, rawInput }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "use required",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: user,
      },
    });
  })
  .query("getMyProjects", {
    input: z.object({
      skip: z.number().default(0),
      take: z.number().default(10),
    }),
    async resolve({ ctx, input }) {
      return ctx.db.project.findMany({
        where: {
          author: ctx.user.email,
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
    },
  })
  .mutation("createProject", {
    input: CreateProjectSchema,
    async resolve({ input, ctx }) {
      return await ctx.db.project.create({
        data: {
          name: input.name,
          body: "",
          description: "",
          previewImage: "",
          how: "",
          what: "",
          why: "",
          buildSteps: [],
          draft: true,
          author: ctx.user.email,
        },
      });
    },
  })
  .query("getUserInfo", {
    async resolve({ ctx }) {
      const latestProjects = await ctx.db.project.findMany({
        take: 9,
        where: {
          author: ctx.user.email,
        },
      });
      const publishedProjectsCount = await ctx.db.project.count({
        where: {
          published: true,
          author: ctx.user.email,
        },
      });
      return {
        latestProjects,
        publishedProjectsCount,
      };
    },
  });
