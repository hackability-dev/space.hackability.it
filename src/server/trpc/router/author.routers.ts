import { z } from "zod";
import { CreateProjectSchema } from "../../../projects/schema";
import * as t from "../trpc";

const pAuth = t.protectedProcedure;

export const authorRouter = t.router({
  getMyProjects: pAuth
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
  createProject: pAuth
    .input(CreateProjectSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.project.create({
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
          author: ctx.session.user.email,
        },
      });
    }),
  getUserInfo: pAuth.query(async ({ ctx }) => {
    const latestProjects = await ctx.prisma.project.findMany({
      take: 9,
      where: {
        author: ctx.session.user.email,
      },
    });
    const publishedProjectsCount = await ctx.prisma.project.count({
      where: {
        published: true,
        author: ctx.session.user.email,
      },
    });
    return {
      latestProjects,
      publishedProjectsCount,
    };
  }),
});
