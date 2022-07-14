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

const baseInput = { projectId: z.string() };

export const projectsRouter = createRouter()
  .middleware(async ({ ctx, next, rawInput }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "use required",
      });
    }
    const result = z.object(baseInput).safeParse(rawInput);
    if (!result.success) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const project = await ctx.db.project.findFirst({
      where: {
        id: result.data.projectId,
        author: user.email,
      },
    });

    if (!project) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    return next({
      ctx: {
        ...ctx,
        user: user,
        project,
      },
    });
  })
  .mutation("generateCloudinaryUploadSignature", {
    input: z.object({
      ...baseInput,
    }),
    resolve({ ctx, input }) {
      return ctx.imageStorage.getSignUrl(input.projectId);
    },
  })
  .mutation("publishProject", {
    input: z.object({
      ...baseInput,
    }),
    resolve({ ctx, input }) {
      return ctx.db.project.update({
        where: {
          id: input.projectId,
        },
        data: {
          draft: false,
        },
      });
    },
  })
  .mutation("generategsUploadUrl", {
    input: z.object({
      ...baseInput,
      fileName: z.string(),
    }),
    async resolve({ input, ctx }) {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const filepath = path.join(folder, input.fileName);
      const [url] = await ctx.storage.bucket.file(filepath).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 2 * 60 * 1000, // 2 minutes
        contentType: "application/x-www-form-urlencoded",
      });
      return url;
    },
  })
  .mutation("deleteFile", {
    input: z.object({
      ...baseInput,
      fileName: z.string(),
    }),
    async resolve({ input, ctx }) {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const filepath = path.join(folder, input.fileName);
      const file = ctx.storage.bucket.file(filepath);
      if (await file.exists()) {
        await file.delete();
      }
    },
  })
  .query("renderProject", {
    input: z.object({
      ...baseInput,
    }),
    async resolve({ ctx, input }) {
      const project = await getRenderedProject(input.projectId, ctx.db);
      if (!project || project.author !== ctx.user.email) {
        return null;
      }
      return {
        ...project,
      };
    },
  })
  .query("getMyProject", {
    input: z.object({
      ...baseInput,
    }),
    async resolve({ ctx, input }) {
      const project = ctx.project;
      return {
        ...project,
        buildSteps: StepSchema.array().parse(project.buildSteps),
      };
    },
  })

  .mutation("saveProject", {
    input: z.object({
      ...baseInput,
      project: ProjectSchema,
    }),
    async resolve({ input, ctx }) {
      const project = await ctx.db.project.findFirst({
        select: {
          id: true,
        },
        where: {
          id: input.projectId,
          author: ctx.user.email,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return await ctx.db.project.update({
        data: input.project,
        where: {
          id: input.projectId,
        },
      });
    },
  });
