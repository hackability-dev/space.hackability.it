import { z } from "zod"

export const ProjectFormSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(10).max(250),
})
