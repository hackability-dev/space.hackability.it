import { z } from "zod";

export const ProjectSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(200),
  tags: z.string().array().default([]),
  why: z.string().max(200),
  what: z.string().max(200),
  how: z.string().max(200),
  body: z.string(),
  previewImage: z.string(),
  buildSteps: z
    .object({
      title: z.string().max(50),
      previewImage: z.string(),
      description: z.string().max(200),
      body: z.string(),
    })
    .array()
    .default([]),
});

export const CreateProjectSchema = z.object({
  name: z.string().max(50),
});
