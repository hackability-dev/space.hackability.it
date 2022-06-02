import { serialize } from "next-mdx-remote/serialize";
import { PrismaClient } from "prisma";

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
  return {
    ...project,
    renderedBody,
  };
};

export type RenderedProject = Exclude<
  Awaited<ReturnType<typeof getRenderedProject>>,
  null | undefined
>;
