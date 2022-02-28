import type { Project } from "@prisma/client";
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
}: ProjectPreviewProps) => (
  <div>
    <div className="flex flex-col rounded hover:ring-2 shadow-lg hover:shadow-xl transition ease-in-out overflow-hidden bg-white">
      <img
        className="h-64 w-full object-cover"
        src={project.previewImage}
        alt={name}
      />
      <div className="p-4">
        <div>
          <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
            Category
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg mt-2">{name}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);
