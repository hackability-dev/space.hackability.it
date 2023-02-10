import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { formatBytes } from "../../utils/bytes";
import { trpc } from "../../utils/trpc";

export const ProjectFiles = ({ projectId }: { projectId: string }) => {
  const { data: files } = trpc.files.getProjectFiles.useQuery({ projectId });

  const { mutateAsync: getDownloadUrl } =
    trpc.files.getDownloadFileUrl.useMutation();

  const downloadFile = useCallback(
    async (projectId: string, fileName: string) => {
      const url = await getDownloadUrl({ projectId, fileName });
      if (url) {
        window.open(url, "_blank");
      }
    },
    [getDownloadUrl]
  );

  if (!files) {
    return null;
  }

  if (files.length === 0) {
    return null;
  }

  return (
    <ProjectFilesTable
      files={files?.map((f) => ({
        filename: f.name.split("/").pop() || "",
        size: Number(f.size),
        type: f.name.split(".").pop() || "",
      }))}
      downloadFile={downloadFile}
      projectId={projectId}
    ></ProjectFilesTable>
  );
};

export interface ProjectFilesTableProps {
  projectId: string;
  downloadFile: (projectId: string, filename: string) => void;
  files?: {
    filename: string;
    size: number;
    type: string;
  }[];
}

const ProjectFilesTable = ({
  files,
  projectId,
  downloadFile,
}: ProjectFilesTableProps) => {
  if (!files) {
    return null;
  }
  return (
    <div className="overflow-x-auto">
      <table className="table-compact table w-full">
        <thead>
          <tr>
            <th>Filename</th>
            <th>Size</th>
            <th>Type</th>
            <th className=""></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.filename}>
              <th>{file.filename}</th>
              <td>{formatBytes(file.size)}</td>
              <td>{file.type}</td>
              <td className="flex justify-end">
                <button
                  type="button"
                  className="btn-ghost btn-sm btn-square btn-circle btn"
                  onClick={() => downloadFile(projectId, file.filename)}
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
