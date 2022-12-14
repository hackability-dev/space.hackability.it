import { prisma } from "../../server/db/client";
import { StepsSchema } from "../schema";
import { EditorDataSchema } from "../../ui/editor/schema";

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
  const body = EditorDataSchema.parse(project.body);

  const steps = await Promise.all(
    psteps.map(async (step) => {
      const body = EditorDataSchema.parse(step.body);
      return {
        ...step,
        body,
      };
    })
  );

  return {
    ...project,
    body,
    steps,
  };
};

export type RenderedProject = Exclude<
  Awaited<ReturnType<typeof renderProject>>,
  null | undefined
>;
