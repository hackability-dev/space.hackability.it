import { serialize } from "next-mdx-remote/serialize";
import { prisma } from "../../server/db/client";
import { StepsSchema } from "../schema";

export const renderProject = async (projectId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
  if (!project) {
    return null;
  }

  const psteps = StepsSchema.parse(project.buildSteps);

  const renderedBody = await serialize(project.body, {});
  const steps = await Promise.all(
    psteps.map(async (step) => {
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
  Awaited<ReturnType<typeof renderProject>>,
  null | undefined
>;
