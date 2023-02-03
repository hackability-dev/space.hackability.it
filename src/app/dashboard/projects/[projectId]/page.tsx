"use client";
import Link from "next/link";
import { ProjectView } from "../../../../projects/ui/project-view";
import { trpc } from "../../../../utils/trpc";

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  const projectId = params.projectId;

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
    <>
      <h1 className=""> {project.name} </h1>
      <Link href={`${projectId}/edit`}>Modifica progetto</Link>
      <ProjectView project={project} />
    </>
  );
};

export default ProjectPage;
