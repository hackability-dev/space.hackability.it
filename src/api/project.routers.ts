import { TRPCError } from "@trpc/server";
import { serialize } from "next-mdx-remote/serialize";
import { cloudinary, cloudinaryConfig } from "../services/cloudinary";
import { z } from "zod";
import { createRouter } from "./router";
import { CreateProjectSchema, ProjectSchema } from "src/projects/schema";
import { CreateProjectForm } from "components/forms/create-project";
import { getRenderedProject } from "utils/getRenderedProject";

export const projectsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
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
  .query("claims", {
    resolve({ ctx }) {
      return {
        user: ctx.user,
      };
    },
  })
  .mutation("cloudinaryUploadSignature", {
    resolve({}) {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const folder = cloudinaryConfig.baseFolder + "/images";
      const apiKey = cloudinaryConfig.apiKey;
      const cloudName = cloudinaryConfig.cloudName;

      const toSign = {
        timestamp,
        folder,
      };
      const signature = cloudinary.utils.api_sign_request(
        toSign,
        cloudinaryConfig.secret
      );
      return { timestamp, signature, folder, apiKey, cloudName };
    },
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
        },
        ...input,
      });
    },
  })
  .query("getMyProject", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const project = await getRenderedProject(input.id, ctx.db);
      if (!project || project.author !== ctx.user.email) {
        return null;
      }
      return {
        ...project,
      };
    },
  })
  .mutation("saveProject", {
    input: z.object({
      project: ProjectSchema,
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const project = await ctx.db.project.findFirst({
        select: {
          id: true,
        },
        where: {
          id: input.id,
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
          id: input.id,
        },
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
  })
  // .mutation("publishPost", {
  //   input: z.object({
  //     id: z.string(),
  //   }),
  //   async resolve({ ctx, input }) {
  //     const post = await ctx.db.post.findFirst({
  //       where: {
  //         id: input.id,
  //         authorId: ctx.authorId,
  //       },
  //     });
  //     if (!post) {
  //       throw new TRPCError({ code: "NOT_FOUND" });
  //     }
  //     if (post.path) {
  //       throw new TRPCError({
  //         code: "BAD_REQUEST",
  //         message: "Post already published",
  //       });
  //     }
  //     const d = post.publishedTime;
  //     const slug = slugify(post.title.substring(0, 50), {
  //       lower: true,
  //       trim: true,
  //       remove: /[*+~.()'"!:@]/g,
  //     });
  //     const path = `/blog/${d.getFullYear()}/${d.getMonth()}/${slug}/`;
  //     return await ctx.db.post.update({
  //       where: {
  //         id: post.id,
  //       },
  //       data: {
  //         path: path,
  //       },
  //     });
  //   },
  // })
  // .query("getPost", {
  //   input: z.object({
  //     id: z.string(),
  //   }),
  //   async resolve({ input, ctx }) {
  //     return await ctx.db.post.findFirst({
  //       where: {
  //         id: input.id,
  //         authorId: ctx.authorId,
  //       },
  //     });
  //   },
  // })
  // .query("getAuthor", {
  //   async resolve({ ctx }) {
  //     return ctx.db.author.findUnique({
  //       where: {
  //         id: ctx.authorId,
  //       },
  //     });
  //   },
  // })
  // .query("getPosts", {
  //   input: z.object({
  //     skip: z.number().int().default(0),
  //     take: z.number().int().default(20),
  //   }),
  //   async resolve({ input, ctx: { db, authorId } }) {
  //     const query = {
  //       where: {
  //         authorId: authorId,
  //       },
  //     };
  //     const total = await db.post.count(query);
  //     const posts = await db.post.findMany({
  //       ...query,
  //       orderBy: {
  //         publishedTime: "desc",
  //       },
  //       ...input,
  //     });
  //     return { posts, total };
  //   },
  // })
  .mutation("mdSerialize", {
    input: z.object({
      body: z.string(),
    }),
    async resolve({ input }) {
      const source = await serialize(input.body, {});
      return { source };
    },
  });
