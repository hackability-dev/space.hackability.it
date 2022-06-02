import { AdminLayout } from "components/admin-layout";
import { ProjectView } from "components/projects/project-view";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";

const ProjectPage = () => {
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
      <h1 className=""> {project.name} </h1>
      <Link href={`${projectId}/edit`}>
        <a> Modifica progetto </a>
      </Link>
      <ProjectView project={project} />
    </AdminLayout>
  );
};

export default ProjectPage;
