import { AdminLayout } from "components/admin-layout";
import Link from "next/link";
import { trpc } from "utils/trpc";

const ProjectsPage = () => {
  const { data, isLoading, error } = trpc.useQuery([
    "author.getMyProjects",
    { skip: 0, take: 20 },
  ]);

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <AdminLayout>
      <h1>projects</h1>
      <div>
        <CreateProjectDialog />
        <ul>
          {data?.map((project) => (
            <li>
              <Link href={"./projects/" + project.id}>
                <a>{project.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default ProjectsPage;

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CreateProjectForm } from "components/forms/create-project";
import { useRouter } from "next/router";

function CreateProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: createProject } = trpc.useMutation(
    "author.createProject"
  );
  const router = useRouter();

  return (
    <>
      <button onClick={() => setIsOpen(true)}> Crea un nuovo progetto</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="z-10 fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="z-10 fixed inset-x-10 bg-white flex items-center justify-center p-4 rounded-lg shadow-lg max-w-md m-auto">
          <Dialog.Panel>
            <Dialog.Title className="font-semibold text-gray-700 text-lg">
              Crea nuovo progetto
            </Dialog.Title>
            <Dialog.Description>
              Inserisci il nome del progetto per continuare
            </Dialog.Description>
            <div className="mt-10">
              <CreateProjectForm
                onSubmit={async (value) => {
                  const project = await createProject(value);
                  router.push(`./projects/${project.id}/edit`);
                }}
                abort={() => setIsOpen(false)}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
