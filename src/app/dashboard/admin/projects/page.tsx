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
  const totalProjects = data?.length || 0;
  const publishedProjects = data?.filter(p => !p.draft).length || 0;
  const draftProjects = data?.filter(p => p.draft).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-lg font-medium">
                  Questa è la piattaforma che raccoglie la documentazione
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
                <p className="mt-2 text-lg text-gray-600">Manage and organize all your projects</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  New Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Projects
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {totalProjects}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Published
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {publishedProjects}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Drafts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {draftProjects}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">All Projects</h2>
              <div className="flex items-center space-x-3">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <div className="min-w-[180px]">
                  <SelectPicker
                    setValue={(v) => {
                      setOrder(v);
                    }}
                    value={order}
                    options={[
                      { label: "Name", value: "name" },
                      { label: "Created Date", value: "created_at" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            {data && data.length > 0 ? (
              <ProjectsList projects={data} />
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first project.</p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    New Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-200 hover:shadow-md hover:ring-gray-300"
        >
          <div className="aspect-w-16 aspect-h-9 relative">
            <img
              src={project.previewImage || "/hackability.png"}
              alt={project.name}
              className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <ProjectStatus draft={project.draft} />
            </div>
          </div>

          <div className="p-6">
            <div className="mb-3">
              <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">by {project.author}</p>
              <p className="mt-1 text-xs text-gray-400">
                {project.createdAt.toDateString()}
              </p>
            </div>

            <p className="line-clamp-3 mb-4 text-sm text-gray-600">
              {project.description}
            </p>

            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex space-x-2">
                {project.draft ? (
                  <button
                    className="btn-ghost btn-sm btn text-xs"
                    onClick={() =>
                      publishMut.mutate({
                        projectId: project.id,
                        draft: false,
                      })
                    }
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    className="btn-ghost btn-sm btn text-xs"
                    onClick={() =>
                      publishMut.mutate({
                        projectId: project.id,
                        draft: true,
                      })
                    }
                  >
                    Unpublish
                  </button>
                )}
              </div>

              <div className="flex space-x-1">
                <a
                  href={`/dashboard/projects/${project.id}/edit`}
                  className="btn-ghost btn-sm btn-circle btn p-2 hover:bg-gray-100"
                  title="Edit project"
                >
                  <PencilIcon className="h-4 w-4" />
                </a>
                {project.draft && (
                  <button
                    className="btn-ghost btn-sm btn-circle btn p-2 hover:bg-red-50 hover:text-red-600"
                    onClick={() => deleteProject(project)}
                    title="Delete project"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
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
              <TextField label={`Type \`DELETE\` to proceed`} name="check" />
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
