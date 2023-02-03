"use client";

import { Dialog } from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateProjectForm } from "../../../projects/forms/create-project";
import { reactApi } from "../../../utils/trpc";
import { useDialogStore } from "../dialog.store";

const ProjectsPage = () => {
  const openDialog = useDialogStore((s) => s.setDialog);
  const { data, isLoading, error } = reactApi.author.getMyProjects.useQuery({
    skip: 0,
    take: 50,
  });

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
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
                onClick={() => openDialog(<CreateProjectDialog />)}
              >
                Crea nuovo
              </button>
            </div>
          </div>
        </div>
        <ProjectsList projects={data!} />
      </div>
    </>
  );
};

export default ProjectsPage;

function CreateProjectDialog() {
  const { mutateAsync: createProject } =
    reactApi.author.createProject.useMutation();
  const router = useRouter();

  const close = useDialogStore((s) => s.closeDialog);

  return (
    <>
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
            router.push(`/dashboard/projects/${project.id}/edit`);
          }}
          abort={close}
        />
      </div>
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
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
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
                      <Link
                        href={`/dashboard/projects/${project.id}/edit`}
                        className="btn-ghost btn-circle btn"
                      >
                        <PencilIcon className="w-6" />
                        <span className="sr-only">, {project.name}</span>
                      </Link>
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
