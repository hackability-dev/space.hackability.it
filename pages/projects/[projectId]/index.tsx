import { ProjectView } from "components/projects/project-view";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { db } from "services/db";
import { Footer } from "ui/footer";
import { Nav } from "ui/nav";
import { getRenderedProject } from "utils/getRenderedProject";

type Props = InferGetStaticPropsType<typeof getStaticPropsAfterCheck>;

const ProjectPage = ({ project }: Props) => {
  return (
    <>
      <Nav />
      {project && <ProjectView project={project} />}
      <Footer />
    </>
  );
};

export default ProjectPage;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ projectId: string }>) => {
  try {
    return getStaticPropsAfterCheck({ params });
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const getStaticPropsAfterCheck = async ({
  params,
}: GetStaticPropsContext<{ projectId: string }>) => {
  const projectId = params?.projectId!;
  if (!projectId) {
    throw new Error();
  }
  const project = await getRenderedProject(projectId, db);
  if (!project) {
    throw new Error();
  }
  return {
    props: {
      project,
    },
  };
};
