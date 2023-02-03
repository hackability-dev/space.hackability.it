import { TRPCError } from "@trpc/server";
import path from "path";
import { z } from "zod";
import { ProjectSchema, StepsSchema } from "../../../projects/schema";
import { renderProject } from "../../../projects/server/render";
import * as t from "../trpc";

const baseInput = { projectId: z.string() };

const withProject = t.middleware(async ({ ctx, next, rawInput }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const result = z.object(baseInput).safeParse(rawInput);
  if (!result.success) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const user = ctx.session.user;
  if (!(user.isAdmin || user.isAuthor)) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const project = await ctx.prisma.project.findFirst({
    where: {
      id: result.data.projectId,
      author: user.isAdmin ? undefined : user.email,
    },
  });

  if (!project) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  return next({
    ctx: {
      ...ctx,
      project,
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    },
  });
});

const pAuthor = t.publicProcedure.use(withProject);

export const projectsRouter = t.router({
  generateCloudinaryUploadSignature: pAuthor
    .input(
      z.object({
        ...baseInput,
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.imageStorage.getSignUrl(input.projectId);
    }),
  generategsUploadUrl: pAuthor
    .input(
      z.object({
        ...baseInput,
        fileName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const filepath = path.join(folder, input.fileName);
      const [url] = await ctx.storage.bucket.file(filepath).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 2 * 60 * 1000, // 2 minutes
        contentType: "application/x-www-form-urlencoded",
      });
      return url;
    }),
  deleteFile: pAuthor
    .input(
      z.object({
        ...baseInput,
        fileName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const filepath = path.join(folder, input.fileName);
      const file = ctx.storage.bucket.file(filepath);
      if (await file.exists()) {
        await file.delete();
      }
    }),
  renderProject: pAuthor
    .input(
      z.object({
        ...baseInput,
      })
    )
    .query(async ({ input }) => {
      return await renderProject(input.projectId);
    }),
  getProject: pAuthor
    .input(
      z.object({
        ...baseInput,
      })
    )
    .query(async ({ ctx }) => {
      const project = ctx.project;
      return {
        ...project,
        buildSteps: StepsSchema.parse(project.buildSteps),
      };
    }),
  saveProject: pAuthor
    .input(
      z.object({
        ...baseInput,
        project: ProjectSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.project.update({
        data: input.project,
        where: {
          id: ctx.project.id,
        },
      });
    }),
});
