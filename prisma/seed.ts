import { Project } from "@prisma/client";
import { z } from "zod";
import db from "./index";
import { projects } from "./projects";

export const StepSchema = z.object({
  title: z.string().max(50),
  previewImage: z.string(),
  description: z.string().max(400),
  body: z.string(),
});

type Step = z.TypeOf<typeof StepSchema>;

const seed = async () => {
  const data = projects.map((project): Project => {
    const steps = project.steps.map((step): Step => {
      return {
        title: step.title,
        description: step.info || "",
        body: step.description
          .map((el) => {
            if (el.type === "text") {
              return (el as any).content as string;
            } else if (el.type === "img") {
              return `![](${(el as any).img.url})`;
            }
            return "";
          })
          .join("\n\n")
          .replaceAll("<br>", "\n\n"),
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
      body: project.long
        .map((el) => {
          if (el.type === "text") {
            return (el as any).content as string;
          } else if (el.type === "img") {
            return `![](${(el as any).img.url})`;
          }
          return "";
        })
        .join("\n\n")
        .replaceAll("<br>", "\n\n"),
      what: project.what,
      tags: [],
      published: false,
      underRevision: true,
      images: [],
      license: project.license || "",
      id: project.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  // await db.project.deleteMany({});
  await db.project.createMany({ data });
  console.log("done");
};

seed();
export default seed;
