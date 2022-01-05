import styled from "@emotion/styled";
import type { Project } from "@prisma/client";
//import { Link, Routes } from "blitz"
import {
  ProjectPreviewStyled,
  Title,
  Header,
  Body,
} from "./ProjectPriview.styles";
interface ProjectPreviewProps {
  project: Project;
  name: string;
  description: string;
  variant?: "primary" | "outline";
}

export const ProjectPreview = ({
  project,
  name,
  description,
  variant = "primary",
}: ProjectPreviewProps) => (
  <ProjectPreviewStyled variant={variant}>
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
      <Header>
        <Title>{name}</Title>
        <p>{description}</p>
      </Header>
      <div className="flex-shrink-0 px-4">
        <img
          className="h-48 w-full object-cover"
          src={
            "https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F0XUTQSgCkQptIfaOI54P%2Fimages%2FByjHCSG5aG3jUjHxOMvW%2FIMG_7438-min@medium.jpg?generation=1563725929822580&alt=media"
          }
          alt={name}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            <a
              href="#"
              className="hover:underline bg-indigo-200 rounded-full text-indigo-500 text-xs px-2 py-1"
            >
              Category
            </a>
          </p>
          {/*<Link href={Routes.ShowProjectPage({ projectId: project.id })}>
          <a className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">{project.name}</p>
            <p className="mt-3 text-base text-gray-500">{project.description}</p>
          </a>
      </Link>*/}
          {/* <Body>{body}</Body> */}
        </div>
        <div className="mt-6 flex items-center">
          {/* <div className="flex-shrink-0">
      <a href={project.author.href}>
        <span className="sr-only">{project.author.name}</span>
        <img
          className="h-10 w-10 rounded-full"
          src={project.author.imageUrl}
          alt=""
        />
      </a>
    </div> */}
          <div className="ml-3">
            {/* <p className="text-sm font-medium text-gray-900">
        <a href={project.author.href} className="hover:underline">
          {project.author.name}
        </a>
      </p> */}
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={project.createdAt.toDateString()}>
                {project.createdAt.toDateString()}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>10 read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ProjectPreviewStyled>
);
