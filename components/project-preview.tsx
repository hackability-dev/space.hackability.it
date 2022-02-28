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
        src="https://www.googleapis.com/download/storage/v1/b/hackability-web.appspot.com/o/projects%2F0XUTQSgCkQptIfaOI54P%2Fimages%2FByjHCSG5aG3jUjHxOMvW%2FIMG_7438-min@medium.jpg?generation=1563725929822580&alt=media"
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
