import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { projects } from "./projects";
import { long2md } from "./validate";
import { EditorDataSchema } from "../src/ui/editor/schema";

const db = new PrismaClient();
export const StepSchema = z.object({
  title: z.string().max(50),
  previewImage: z.string(),
  description: z.string().max(400),
  body: EditorDataSchema,
});

type Step = z.TypeOf<typeof StepSchema>;

const seed = async () => {
  const data = projects.map((project) => {
    const steps = project.steps.map((step): Step => {
      return {
        title: step.title,
        description: step.info || "",
        body: long2md(step.description),
        previewImage: "",
      };
    });

    return {
      name: project.name,
      author: "ludovico@hackability.it",
      description: project.short,
      why: project.why,
      how: project.how,
      draft: !project.completed,
      previewImage: project.preview.url || "",
      buildSteps: steps,
      body: long2md(project.long),
      what: project.what,
      tags: project.tags as unknown as string[],
      published: false,
      underRevision: true,
      images: [],
      license: project.license || "",
      id: project.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  for (const p of data) {
    await db.project.upsert({
      where: { id: p.id },
      create: p,
      update: p,
    });
    console.log("created", p.name);
  }
  console.log("done");
};

seed();
export default seed;
