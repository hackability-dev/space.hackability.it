import { TRPCError } from "@trpc/server";
import path from "path";
import { z } from "zod";
import { createRouter } from "./router";

const baseInput = { projectId: z.string() };

export const projectsFilesRouter = createRouter()
  .middleware(async ({ ctx, next, rawInput }) => {
    const result = z.object(baseInput).safeParse(rawInput);
    if (!result.success) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const project = await ctx.db.project.findFirst({
      where: {
        id: result.data.projectId,
      },
    });

    if (!project) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    if (!project.draft) {
      return next({
        ctx: {
          ...ctx,
          project,
        },
      });
    }

    const user = ctx.user;
    if (!user || project.author !== user.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "use required",
      });
    }
    return next({
      ctx: {
        ...ctx,
        project,
      },
    });
  })
  .mutation("getDownloadFileUrl", {
    input: z.object({
      ...baseInput,
      fileName: z.string(),
    }),
    async resolve({ input, ctx }) {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const filepath = path.join(folder, input.fileName);
      const file = ctx.storage.bucket.file(filepath);
      if (await file.exists()) {
        const [url] = await file.getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + 2 * 60 * 1000, // 2 minutes
        });
        return url;
      }
      return undefined;
    },
  })
  .query("getProjectFiles", {
    input: z.object({
      ...baseInput,
      skip: z.number().default(0),
      take: z.number().default(100),
    }),
    async resolve({ ctx, input }) {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const [files] = await ctx.storage.bucket.getFiles({
        prefix: folder,
      });
      return files.map((f) => ({
        name: f.name,
        size: f.metadata.size,
      }));
    },
  });
