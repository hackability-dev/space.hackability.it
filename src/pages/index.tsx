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
  const totalProjects = projects.length;
  const recentProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center">
              <img
                src="/hackability.png"
                alt="Hackability"
                className="mr-4 h-16 w-16"
              />
              <h1 className="text-4xl font-bold">Hackability</h1>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-2xl font-light">
              Soluzioni innovative per l&apos;accessibilità attraverso
              co-progettazione e fabbricazione digitale
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
                <span className="text-lg font-semibold">
                  {totalProjects} progetti documentati
                </span>
              </div>
              <div className="rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
                <span className="text-lg font-semibold">
                  400+ soluzioni co-progettate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Chi Siamo</h2>
            <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
              <strong>Hackability</strong> è un&apos;associazione no-profit
              fondata a Torino nel 2016, dedicata allo sviluppo di soluzioni
              innovative per l&apos;accessibilità attraverso progettazione
              collaborativa e tecnologie di fabbricazione digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Co-progettazione
              </h3>
              <p className="text-sm text-gray-600">
                Coinvolgimento attivo degli utenti nel processo di design
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Impatto Sociale
              </h3>
              <p className="text-sm text-gray-600">
                ~1.000 soluzioni distribuite annualmente
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Open Source
              </h3>
              <p className="text-sm text-gray-600">
                Tutto rilasciato in Creative Commons
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <svg
                  className="h-8 w-8 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Accessibilità
              </h3>
              <p className="text-sm text-gray-600">
                Migliorare l&apos;autonomia nella vita quotidiana
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects Section */}
      {recentProjects.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Progetti Recenti
              </h2>
              <p className="text-lg text-gray-600">
                Gli ultimi progetti documentati sulla piattaforma
              </p>
            </div>
            <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recentProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group cursor-pointer">
                    <ProjectPreview project={project} />
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="#all-projects">
                <span className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700">
                  Esplora tutti i {totalProjects} progetti
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* All Projects Section */}
      <div className="bg-white py-16" id="all-projects">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Tutti i Progetti
            </h2>
            <p className="text-lg text-gray-600">
              Esplora la documentazione completa dei {totalProjects} progetti
              Hackability
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group cursor-pointer">
                  <ProjectPreview project={project} />
                </div>
              </Link>
            ))}
          </div>
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
    revalidate: 60 * 10,
  };
};
