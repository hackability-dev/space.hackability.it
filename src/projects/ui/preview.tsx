import type { Project } from "@prisma/client";

interface ProjectPreviewProps {
  project: Pick<Project, "name" | "previewImage" | "description">;
}

export const ProjectPreview = ({ project }: ProjectPreviewProps) => (
  <div className="group h-full">
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-gray-200 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-indigo-300">
      <div className="relative overflow-hidden">
        <img
          className="h-48 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          src={project.previewImage || "/hackability.png"}
          alt={project.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
            <svg
              className="h-4 w-4 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">
            {project.name}
          </h3>
          <p className="line-clamp-3 mt-3 text-sm leading-relaxed text-gray-600">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2"></div>
          <div className="flex items-center text-indigo-600 transition-colors duration-200 group-hover:text-indigo-700">
            <span className="text-sm font-medium">Esplora</span>
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);
