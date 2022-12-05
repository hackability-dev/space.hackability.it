import { ProjectPreview } from "components/project-preview";
import { SEO } from "components/seo";
import Layout from "core/layouts/Layout";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { db } from "services/db";
import { Footer } from "ui/footer";
import { Nav } from "ui/nav";

const HomePage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <SEO />
      <Nav />
      <Main {...props} />
      <Footer />
    </>
  );
};

HomePage.getLayout = (page: any) => <Layout title="Home">{page}</Layout>;

export default HomePage;

const Main = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="h-full">
      <div className="bg-white">
        <p className="max-w-7xl my-12 px-10 mx-auto text-center text-xl text-gray-500">
          Questa è la piattaforma che raccoglie la documentazione dei progetti
          nati in co-progettazione secondo il format Hackability. Rilasciamo
          tutto in Open Source e in Creative Commons, perchè vogliamo che ogni
          progetto possa migliorarsi e migliorare la vita delle persone!
        </p>
      </div>
      <div className="bg-gray-100">
        <div className="p-10 max-w-7xl m-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            (<Link key={project.id} href={`/projects/${project.id}`}>

              <ProjectPreview
                project={project}
                description={project.description}
                name={project.name}
              />

            </Link>)
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
    where: {
      draft: false,
    },
    skip: 0,
    take: 180,
  });

  return {
    props: { projects },
    revalidate: 60,
  };
};
