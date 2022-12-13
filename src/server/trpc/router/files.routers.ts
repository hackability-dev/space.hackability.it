import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as t from "../trpc";
import path from "path";

const baseInput = { projectId: z.string() };

const validateProject = t.middleware(async ({ ctx, next, rawInput }) => {
  const result = z.object(baseInput).safeParse(rawInput);
  if (!result.success) {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }

  const project = await ctx.prisma.project.findFirst({
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

  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const pWithProject = t.publicProcedure.use(validateProject);

export const projectsFilesRouter = t.router({
  getDownloadFileUrl: pWithProject
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
        const [url] = await file.getSignedUrl({
          version: "v4",
          action: "read",
          expires: Date.now() + 2 * 60 * 1000, // 2 minutes
        });
        return url;
      }
      return undefined;
    }),
  getProjectFiles: pWithProject
    .input(
      z.object({
        ...baseInput,
        skip: z.number().default(0),
        take: z.number().default(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const folder = ctx.storage.gsProjectFolder(input.projectId);
      const [files] = await ctx.storage.bucket.getFiles({
        prefix: folder,
      });
      return files.map((f) => ({
        name: f.name,
        size: f.metadata.size,
      }));
    }),
});
