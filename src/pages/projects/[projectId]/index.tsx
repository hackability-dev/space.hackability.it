import { GetStaticPropsContext } from "next";
import {
  RenderedProject,
  renderProject,
} from "../../../projects/server/render";
import { ProjectView } from "../../../projects/ui/project-view";
import { Footer } from "../../../ui/footer";
import { Nav } from "../../../ui/nav";
import { SEO } from "../../../ui/seo";

const ProjectPage = ({ project }: { project: RenderedProject }) => {
  return (
    <>
      <SEO
        title={project!.name}
        description={project!.description}
        image={project!.previewImage}
        type="article"
        date={project!.createdAt}
      />
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
    return {
      notFound: true,
    };
  }
  const project = await renderProject(projectId);
  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
};
