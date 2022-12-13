import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { DashboardLayout } from "../../../../layouts/dashboard";
import { ProjectForm } from "../../../../projects/forms/project";
import { ProjectView } from "../../../../projects/ui/project-view";
import { trpc } from "../../../../utils/trpc";

const EditProjectPage = () => {
  const { mutateAsync: saveProject } = trpc.project.saveProject.useMutation();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const {
    data: project,
    isLoading,
    error,
  } = trpc.project.getMyProject.useQuery({ projectId });

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
    <DashboardLayout>
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold text-gray-600">
          Modifica il tuo progetto
        </h1>
        <button
          onClick={async () => {
            setShowModal(true);
          }}
          className="modal-button btn"
        >
          Preview
        </button>
      </div>
      <ProjectPreviewModal
        projectId={projectId}
        setShow={setShowModal}
        show={showModal}
      />

      <ProjectForm
        projectId={projectId}
        initialValues={project}
        onSubmit={async (project) => {
          const res = await saveProject({
            project: project,
            projectId: projectId,
          });
        }}
      />
    </DashboardLayout>
  );
};

export default EditProjectPage;

const ProjectPreviewModal = ({
  setShow,
  show,
  projectId,
}: {
  show: boolean;
  setShow: (s: boolean) => void;
  projectId: string;
}) => {
  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = trpc.project.renderProject.useQuery({ projectId });
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
    <Dialog
      onLoad={() => refetch()}
      open={show}
      onClose={() => setShow(false)}
      className="fixed inset-0 z-50 overflow-y-auto "
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="fixed inset-10 overflow-auto rounded bg-white shadow-xl ring-1">
        <div className="overflow-y-scroll rounded-2xl">
          <ProjectView project={project} />
        </div>
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 grid h-10 w-10 place-content-center rounded-full hover:bg-slate-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </Dialog>
  );
};
