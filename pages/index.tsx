import styled from "@emotion/styled";
import Layout from "core/layouts/Layout";
import { InferGetStaticPropsType } from "next";
import { ProjectPreview } from "projects/components/ProjectPreview";
import { db } from "services/db";
import { Footer } from "ui/footer";
import { Nav } from "ui/nav";
import { trpc } from "utils/trpc";

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <PageLayout>
      <Nav />
      <Main {...props} />
      <Footer />
    </PageLayout>
  );
};

HomePage.getLayout = (page: any) => <Layout title="Home">{page}</Layout>;

export default HomePage;

const PageLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Main = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="h-full bg-blue-500">
      <ProjectsList className="p-10 max-w-7xl m-auto">
        {projects.map((project) => (
          <ProjectPreview
            key={project.id}
            project={project}
            description={project.description}
            name={project.name}
          />
        ))}
      </ProjectsList>
    </main>
  );
};

const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const getStaticProps = async () => {
  const projects = await db.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 18,
  });

  return {
    props: { projects },
  };
};
