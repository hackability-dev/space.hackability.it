import { type InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ProjectPreview } from "../projects/ui/preview";
import { prisma } from "../server/db/client";
import { Footer } from "../ui/footer";
import { Nav } from "../ui/nav";
import { SEO } from "../ui/seo";

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

export default HomePage;

const Main = ({ projects }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <main className="h-full">
      <div className="bg-white">
        <p className="my-12 mx-auto max-w-7xl px-10 text-center text-xl text-gray-500">
          Questa è la piattaforma che raccoglie la documentazione dei progetti
          nati in co-progettazione secondo il format Hackability. Rilasciamo
          tutto in Open Source e in Creative Commons, perchè vogliamo che ogni
          progetto possa migliorarsi e migliorare la vita delle persone!
        </p>
      </div>
      <div className="bg-gray-100">
        <div className="m-auto grid max-w-7xl gap-6 p-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectPreview project={project} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export const getStaticProps = async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      draft: false,
    },
    skip: 0,
    take: 180,
    select: {
      id: true,
      name: true,
      previewImage: true,
      description: true,
    },
  });

  return {
    props: { projects },
    revalidate: 60,
  };
};
