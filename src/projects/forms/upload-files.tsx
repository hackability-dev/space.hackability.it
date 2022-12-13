import { DragEventHandler, useRef, useState } from "react";
import { useUpload } from "../../providers/upload";

interface UploadFilesFieldsProps {
  projectId: string;
  onUploadCompleted: () => Promise<void>;
  onUploadFileCompleted: () => Promise<void>;
}

export const UploadFilesFields = ({
  projectId,
  onUploadCompleted,
  onUploadFileCompleted,
}: UploadFilesFieldsProps) => {
  const { handleUpload } = useUpload();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (file: FileList) => {
    const uploadFuncs = Array.from(file).map(async (file) => {
      await handleUpload(file, projectId);
      onUploadFileCompleted();
    });
    await Promise.all(uploadFuncs);
    onUploadCompleted();
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`grid place-content-center  rounded-lg border-2 border-dashed p-4 text-center ${
        dragActive ? "border-gray-700 bg-gray-200" : "border-gray-200"
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragEnter}
      onDrop={handleDrop}
    >
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        ref={inputRef}
        onChange={async (e) => {
          if (e.target.files) {
            uploadFiles(e.target.files);
          }
        }}
      />
      <label
        id="file-upload"
        htmlFor="file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <p>Trascina i file qui, oppure</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="link-primary"
          >
            Upload a file
          </button>
        </div>
      </label>
    </div>
  );
};
