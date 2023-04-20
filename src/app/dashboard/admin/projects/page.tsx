"use client";
import { Dialog } from "@headlessui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Project } from "@prisma/client";
import { reactApi } from "src/utils/trpc";
import { useDialogStore } from "../../dialog.store";
import { z } from "zod";
import { ZodForm } from "src/projects/forms/zod-form";
import { FORM_ERROR } from "final-form";
import { TextField } from "src/projects/forms/text-field";
import clsx from "clsx";
import { SelectPicker } from "src/projects/forms/select-field";
import { useState } from "react";

const ProjectsPage = () => {
  const [order, setOrder] = useState<string>("name");
  const { data, isLoading, error } = reactApi.admin.getAllProjects.useQuery({
    skip: 0,
    take: 50,
    orderBy: order,
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
              <p className="mt-2 text-sm text-gray-700">Tutti i progetti</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
          </div>
        </div>
        <div className="mt-10 flex items-center space-x-2">
          <span>Order By</span>
          <div className="w-80">
            <SelectPicker
              setValue={(v) => {
                setOrder(v);
              }}
              value={order}
              options={[
                { label: "Name", value: "name" },
                { label: "Created At", value: "created_at" },
              ]}
            />
          </div>
        </div>

        <ProjectsList projects={data!} />
      </div>
    </>
  );
};

export default ProjectsPage;

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
  const utils = reactApi.useContext();
  const publishMut = reactApi.admin.setDraft.useMutation({
    onSuccess: () => {
      utils.admin.invalidate();
    },
  });
  const deleteProject = useDeleteProject();

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
                      <div className="flex content-center justify-end">
                        {project.draft ? (
                          <>
                            <button
                              className="btn-ghost btn-sm btn"
                              onClick={() =>
                                publishMut.mutate({
                                  projectId: project.id,
                                  draft: false,
                                })
                              }
                            >
                              publish
                            </button>
                            <button
                              className="btn-ghost btn-sm btn-circle btn"
                              onClick={() => deleteProject(project)}
                            >
                              <TrashIcon className="w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn-ghost btn-sm btn"
                            onClick={() =>
                              publishMut.mutate({
                                projectId: project.id,
                                draft: true,
                              })
                            }
                          >
                            unpublish
                          </button>
                        )}
                        <a
                          href={`/dashboard/projects/${project.id}/edit`}
                          className="btn-ghost btn-sm btn-circle btn"
                        >
                          <PencilIcon className="w-4" />
                          <span className="sr-only">, {project.name}</span>
                        </a>
                      </div>
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

const useDeleteProject = () => {
  const createDialog = useDialogStore((s) => s.setDialog);
  return (project: Pick<Project, "id" | "name">) => {
    createDialog(<DeleteProjectDialog project={project} />);
  };
};

function DeleteProjectDialog({
  project,
}: {
  project: Pick<Project, "id" | "name">;
}) {
  const close = useDialogStore((s) => s.closeDialog);
  const utils = reactApi.useContext();

  const deleteProject = reactApi.admin.deleteProject.useMutation({
    onSuccess: async () => {
      await utils.admin.invalidate();
      close();
    },
  });

  const DeleteSchema = z.object({
    check: z.literal("DELETE"),
  });

  return (
    <>
      <Dialog.Title className="text-lg font-semibold text-gray-700">
        Delete Project
      </Dialog.Title>
      <Dialog.Description>
        Are you sure you want to delete <strong>{project.name}</strong>?
      </Dialog.Description>
      <div className="mt-10">
        <ZodForm
          schema={DeleteSchema}
          onSubmit={async () => {
            await deleteProject.mutateAsync({
              projectId: project.id,
            });
          }}
        >
          {({ handleSubmit, submitting, invalid, submitErrors }) => (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <TextField label={`Type \`DELETE\` to procede`} name="check" />
              <div>
                {submitErrors?.[FORM_ERROR] && (
                  <span className="text-sm text-red-500">
                    {submitErrors[FORM_ERROR]}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={invalid || submitting}
                  className={clsx("btn-error btn-sm btn", {
                    loading: submitting,
                  })}
                >
                  Delete
                </button>
              </div>
            </form>
          )}
        </ZodForm>
      </div>
    </>
  );
}
