"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ProjectPreview } from "src/projects/ui/preview";
import { reactApi } from "src/utils/trpc";

const DashboardPage = () => {
  const { data: session } = useSession();

  if (!session || !session.user) return <div></div>;

  const user = session?.user;

  if (!user.isAuthor) {
    return (
      <div className="prose prose-sm">
        <h3>Ciao {session.user.name}</h3>
        <p>
          Non sei stato autorizzato per creare nuovi progetti in hackability!
        </p>
        <p>
          Attendi la tua autorizzazione o contatta il tuo referente
          all&emph;intenro di Hackability!
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="prose prose-sm">
        <h3>Bentornato {session.user.name}</h3>
        <p>Sei autorizzato a creare nuovi progetti in hackability!</p>
      </div>
      <ListMyProject />
    </>
  );
};

export default DashboardPage;

const ListMyProject = () => {
  const q = reactApi.author.getMyProjects.useQuery({
    skip: 0,
    take: 6,
  });

  if (q.isLoading) {
    return <div>Loading...</div>;
  }

  if (q.error) {
    return <div>{q.error.message}</div>;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl text-gray-700"> I tuoi ultimi progetti!</h2>
      <ul className="mt-4 gap-8 md:grid md:grid-cols-3">
        {q.data.map((p) => (
          <li key={p.id}>
            <Link href={`./dashboard/projects/${p.id}`}>
              <ProjectPreview project={p} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
