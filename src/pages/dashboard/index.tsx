import { useSession } from "next-auth/react";
import Link from "next/link";
import { DashboardLayout } from "../../layouts/dashboard";
import { ProjectPreview } from "../../projects/ui/preview";
import { trpc } from "../../utils/trpc";

const Admin = () => {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <h1 className="text-lg ">
        Bentornato,{" "}
        <span className="font-semibold italic">{session?.user?.name}</span>!
      </h1>

      <ListMyProject />
    </DashboardLayout>
  );
};

export default Admin;

const ListMyProject = () => {
  const q = trpc.author.getMyProjects.useQuery({
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
