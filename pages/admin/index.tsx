import { useUser } from "@auth0/nextjs-auth0/client";
import { AdminLayout } from "components/admin-layout";
import { ProjectPreview } from "components/project-preview";
import Link from "next/link";
import { trpc } from "utils/trpc";

const Admin = () => {
  const userData = useUser();
  const userInfoQuery = trpc.useQuery(["author.getUserInfo"]);

  const isLoading = userData.isLoading || userInfoQuery.isLoading;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const error = userData.error || userInfoQuery.error;
  if (error) {
    return <div>{error.message}</div>;
  }

  const user = userData.user!;
  const info = userInfoQuery.data!;

  return (
    <AdminLayout>
      <h1 className="text-lg ">
        Bentornato, <span className="font-semibold italic">{user?.name}</span>!
      </h1>

      <div className="mt-16">
        <h2 className="text-gray-700 text-2xl"> I tuoi ultimi progetti!</h2>
        <ul className="md:grid md:grid-cols-3 gap-8 mt-4">
          {info.latestProjects.map((p) => (
            <li key={p.id}>
              <Link href={`./admin/projects/${p.id}`}>
                <ProjectPreview
                  description={p.description}
                  name={p.name}
                  project={p}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <a
          className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded mt-2"
          href="/api/auth/logout"
        >
          Logout
        </a>
      </div>
    </AdminLayout>
  );
};

export default Admin;
