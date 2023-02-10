import { z } from "zod";
import { EditorDataSchema } from "../ui/editor/schema";

export const StepSchema = z.object({
  title: z.string().max(100),
  previewImage: z.string().optional(),
  description: z.string(),
  body: EditorDataSchema,
});
export const StepsSchema = StepSchema.array();

export const ProjectSchema = z.object({
  name: z.string().max(100),
  description: z.string(),
  tags: z.string().array().default([]),
  why: z.string(),
  what: z.string(),
  how: z.string(),
  body: EditorDataSchema,
  previewImage: z.string(),
  buildSteps: StepSchema.array().default([]),
});

export const CreateProjectSchema = z.object({
  name: z.string().max(50),
});

export type ProjectStep = z.infer<typeof StepSchema>;
