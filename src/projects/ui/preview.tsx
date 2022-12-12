import type { Project } from "@prisma/client";

interface ProjectPreviewProps {
  project: Pick<Project, "name" | "previewImage" | "description">;
}

export const ProjectPreview = ({ project }: ProjectPreviewProps) => (
  <div>
    <div className="flex flex-col overflow-hidden rounded bg-white shadow-lg transition ease-in-out hover:shadow-xl hover:ring-2">
      <img
        className="h-64 w-full object-cover"
        src={project.previewImage || "/hackability.png"}
        alt={project.name}
      />
      <div className="p-4">
        <div>
          {/* <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            Category
          </span> */}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">
          {project.name}
        </h3>
        <p className="mt-1 text-gray-600">{project.description}</p>
      </div>
    </div>
  </div>
);
