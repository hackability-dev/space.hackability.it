import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "../../../layouts/dashboard";
import { CreateProjectForm } from "../../../projects/forms/create-project";
import { trpc } from "../../../utils/trpc";

const ProjectsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, error, refetch } =
    trpc.admin.getAllProjects.useQuery({ skip: 0, take: 50 });

  const { mutateAsync: publishProject } =
    trpc.project.publishProject.useMutation();

  const handlePublish = async (projectId: string) => {
    await publishProject({ projectId });
    refetch();
  };

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <DashboardLayout>
      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div>
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Progetti</h1>
              <p className="mt-2 text-sm text-gray-700">Ecco i miei progetti</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => setIsDialogOpen(true)}
              >
                Crea nuovo
              </button>
            </div>
          </div>
        </div>
        <ProjectsList projects={data!} publish={handlePublish} />
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;

function CreateProjectDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { mutateAsync: createProject } =
    trpc.author.createProject.useMutation();
  const router = useRouter();

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <div className="fixed inset-0 z-10 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-x-10 top-20 z-10 m-auto flex max-w-md items-center justify-center rounded-lg bg-white p-4 shadow-lg">
          <Dialog.Panel>
            <Dialog.Title className="text-lg font-semibold text-gray-700">
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
                abort={onClose}
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

interface ProjectsListProps {
  projects: {
    author: string;
    id: string;
    description: string;
    name: string;
    previewImage?: string;
    draft: boolean;
    createdAt: Date;
  }[];
  publish: (projectId: string) => void;
}

const ProjectsList = ({ projects, publish }: ProjectsListProps) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Progetto
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={project.previewImage || "/hackability.png"}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="space-x-2">
                            <span className="font-medium text-gray-900">
                              {project.name}
                            </span>
                            <span className="italic text-gray-900">
                              {project.createdAt.toDateString()}
                            </span>
                            <ProjectStatus draft={project.draft} />
                          </div>
                          <div className="overflow-hidden  whitespace-pre-wrap text-gray-500">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="relative space-x-2 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        className="link-primary link"
                        onClick={() => publish(project.id)}
                      >
                        {" "}
                        publish{" "}
                      </button>
                      <a
                        href={`./projects/${project.id}/edit`}
                        className="link-primary link"
                      >
                        Edit
                        <span className="sr-only">, {project.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectStatus = ({ draft }: { draft: boolean }) => {
  const classes =
    "inline-flex rounded-full px-2 text-xs font-semibold leading-5";
  if (draft) {
    return (
      <span className={`${classes} bg-orange-100 text-orange-800`}>Draft</span>
    );
  }
  return (
    <span className={`${classes} bg-green-100 text-green-800`}>Published</span>
  );
};
