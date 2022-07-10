import { serialize } from "next-mdx-remote/serialize";
import { PrismaClient } from "prisma";
import { ProjectStep } from "src/projects/schema";

export const getRenderedProject = async (
  projectId: string,
  db: PrismaClient
) => {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
    },
  });
  if (!project) {
    return null;
  }

  const renderedBody = await serialize(project.body, {});

  const steps = await Promise.all(
    (project.buildSteps as ProjectStep[]).map(async (step) => {
      const renderedBody = await serialize(step.body, {});
      return {
        ...step,
        body: renderedBody,
      };
    })
  );

  return {
    ...project,
    renderedBody,
    steps,
  };
};

export type RenderedProject = Exclude<
  Awaited<ReturnType<typeof getRenderedProject>>,
  null | undefined
>;
