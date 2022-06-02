import { Project } from "@prisma/client";
import db from "./index";
import { projects } from "./projects";

type NonNullable<T> = Exclude<T, null | undefined>;
type Ref = NonNullable<Parameters<typeof db.project.createMany>[0]>["data"];

const seed = async () => {
  const data = projects.map((project) => {
    return {
      name: project.name,
      author: "ludovico@hackability.it",
      description: project.short,
      why: project.why,
      how: project.how,
      draft: true,
      previewImage: project.preview.url || "",
      buildSteps: [],
      body: project.long
        .map((el) => {
          console.log(project.name, el.type);
          if (el.type === "text") {
            console.log((el as any).content);
            return (el as any).content as string;
          } else if (el.type === "img") {
            console.log((el as any).img.url);
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
      license: "",
    };
  });
  await db.project.deleteMany({});
  await db.project.createMany({ data });
  console.log("done");
};

seed();
export default seed;
