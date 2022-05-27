import { AdminLayout } from "components/admin-layout";
import { ProjectForm } from "components/forms/project";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const EditProjectPage = () => {
  const { mutateAsync: saveProject } = trpc.useMutation(["author.saveProject"]);
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const {
    data: project,
    isLoading,
    error,
  } = trpc.useQuery(["author.getMyProject", { id: projectId }]);
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
    <AdminLayout>
      <h1 className=""> Create a New Project </h1>
      <ProjectForm
        initialValues={project as any}
        onSubmit={async (project) => {
          const res = await saveProject({
            project: project,
            id: projectId,
          });
        }}
      />
    </AdminLayout>
  );
};

export default EditProjectPage;
