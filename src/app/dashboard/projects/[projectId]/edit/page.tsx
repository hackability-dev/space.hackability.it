"use client";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDialogStore } from "src/app/dashboard/dialog.store";
import { reactApi } from "src/utils/trpc";
import { ProjectForm } from "../../../../../projects/forms/project";
import { ProjectSchema } from "../../../../../projects/schema";
import { ProjectView } from "../../../../../projects/ui/project-view";

const EditProjectPage = ({ params }: { params: { projectId: string } }) => {
  const openPreviewDialog = useDialogStore((s) => s.setDialog);

  const { mutateAsync: saveProject } =
    reactApi.project.saveProject.useMutation();
  const projectId = params.projectId;
  const {
    data: project,
    isLoading,
    error,
  } = reactApi.project.getProject.useQuery({ projectId });

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!project) {
    return <p>error not found</p>;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">
          Modifica il tuo progetto
        </h1>
        <button
          onClick={async () => {
            openPreviewDialog(
              <ProjectPreviewModal projectId={projectId} />,
              true
            );
          }}
          className="modal-button btn-ghost btn-circle btn"
        >
          <EyeIcon className="h-6" />
        </button>
      </div>

      <ProjectForm
        projectId={projectId}
        initialValues={ProjectSchema.parse(project)}
        onSubmit={async (project) => {
          await saveProject({
            project: project,
            projectId: projectId,
          });
        }}
      />
    </>
  );
};

export default EditProjectPage;

const ProjectPreviewModal = ({ projectId }: { projectId: string }) => {
  const {
    data: project,
    isLoading,
    error,
  } = reactApi.project.renderProject.useQuery({ projectId });
  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!project) {
    return <p>error not found</p>;
  }

  return (
    <div>
      <div className="overflow-y-scroll rounded-2xl">
        <ProjectView project={project} />
      </div>
      <button className="absolute top-4 right-4 grid h-10 w-10 place-content-center rounded-full hover:bg-slate-200">
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
