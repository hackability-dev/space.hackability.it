import styled from "@emotion/styled";
import { ProjectPreview } from "components/project-preview";
import Layout from "core/layouts/Layout";
import { InferGetStaticPropsType } from "next";
import { db } from "services/db";
import { Footer } from "ui/footer";
import { Nav } from "ui/nav";
import { trpc } from "utils/trpc";

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = trpc.useQuery(["auth", {}]);
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
    <main className="h-full">
      <div className="bg-white">
        <p className="max-w-7xl my-12 mx-auto text-center">
          Questa è la piattaforma che raccoglie la documentazione dei progetti
          nati in co-progettazione secondo il format Hackability. Rilasciamo
          tutto in Open Source e in Creative Commons, perchè vogliamo che ogni
          progetto possa migliorarsi e migliorare la vita delle persone!
        </p>
      </div>
      <div className="bg-gray-100">
        <div className="p-10 max-w-7xl m-auto grid grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectPreview
              key={project.id}
              project={project}
              description={project.description}
              name={project.name}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

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
