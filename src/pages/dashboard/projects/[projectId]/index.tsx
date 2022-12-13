import Link from "next/link";
import { useRouter } from "next/router";
import { DashboardLayout } from "../../../../layouts/dashboard";
import { ProjectView } from "../../../../projects/ui/project-view";
import { trpc } from "../../../../utils/trpc";

const ProjectPage = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const {
    data: project,
    isLoading,
    error,
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
    <DashboardLayout>
      <h1 className=""> {project.name} </h1>
      <Link href={`${projectId}/edit`}>Modifica progetto</Link>
      <ProjectView project={project} />
    </DashboardLayout>
  );
};

export default ProjectPage;
