import axios, { AxiosProgressEvent } from "axios";
import cuid from "cuid";
import React, {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { trpc } from "utils/trpc";

const UploadContext = createContext({
  handleUpload: async (file: File, projectId: string) => {},
});

interface Uploads {
  [k: string]: UploadStatus;
}

interface UploadStatus {
  filename: string;
  progress: number;
  status: "uploading" | "done" | "error";
}

export const useUpload = () => React.useContext(UploadContext);

export const UploadProvider = ({ children }: { children: ReactElement }) => {
  const [uploads, setUploads] = React.useState<Uploads>({});

  const [hidden, setHidden] = React.useState(false);

  const { mutateAsync: getGsUploadUrl } = trpc.useMutation([
    "author.project.generategsUploadUrl",
  ]);

  const [closed, setClosed] = useState(false);

  const createUpload = useCallback(
    (k: string, upload: UploadStatus) => {
      console.log("create", k, upload);
      setUploads((u) => ({
        ...u,
        [k]: upload,
      }));
    },
    [setUploads]
  );

  const setUpload = useCallback(
    (k: string, upload: Partial<UploadStatus>) => {
      setUploads((uploads) => {
        if (!uploads[k]) {
          return uploads;
        }
        setHidden(false);
        return {
          ...uploads,
          [k]: {
            ...uploads[k],
            ...upload,
          },
        };
      });
    },
    [setUploads]
  );

  const handleUpload = async (file: File, projectId: string) => {
    const k = cuid();
    const url = await getGsUploadUrl({
      projectId: projectId,
      fileName: file.name,
    });
    createUpload(k, {
      filename: file.name,
      progress: 0,
      status: "uploading",
    });
    try {
      const res = await axios.request({
        method: "PUT",
        url: url,
        data: file,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        onUploadProgress: (p: AxiosProgressEvent) => {
          const per = Math.round((p.loaded * 100) / p.total!);
          console.log(per);
          setUpload(k, {
            progress: per,
          });
        },
      });
      setUpload(k, {
        status: "done",
      });
    } catch (e) {
      setUpload(k, {
        progress: 0,
        status: "error",
      });
    }
  };

  return (
    <UploadContext.Provider value={{ handleUpload }}>
      <>{children}</>
      <UploadBox
        hidden={hidden}
        setHidden={setHidden}
        uploads={uploads}
        closed={closed}
        setClosed={setClosed}
      />
    </UploadContext.Provider>
  );
};

const UploadBox = ({
  uploads,
  closed,
  setClosed,
  hidden,
  setHidden,
}: {
  uploads: Uploads;
  closed: boolean;
  setClosed: (val: boolean) => void;
  hidden: boolean;
  setHidden: (val: boolean) => void;
}) => {
  const entries = Object.entries(uploads);
  const toUpload = entries.filter(([, { status }]) => status === "uploading");
  if (hidden || entries.length === 0) {
    return null;
  }
  return (
    <div className="fixed right-0 bottom-0 m-2 w-96 bg-white shadow-2xl rounded overflow-hidden">
      <div className="bg-gray-800 text-gray-300 h-12 p-2 flex items-center text-sm justify-between">
        {toUpload.length === 0 ? (
          <span>Uploaded {entries.length} files...</span>
        ) : (
          <span>
            Uploading {toUpload.length}/{entries.length} files...
          </span>
        )}
        <span className="flex space-x-2">
          <button onClick={() => setClosed(!closed)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 duration-300 ${!closed && "rotate-180"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button onClick={() => setHidden(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </div>
      {!closed && (
        <div className="max-h-48 overflow-y-scroll">
          {entries.map(([key, status]) => (
            <div key={key} className="grid grid-cols-10 items-center h-12 p-2">
              <span className="col-span-2 text-xs overflow-hidden whitespace-nowrap ">
                {" "}
                {status.filename}
              </span>
              <div className="col-span-7 px-2">
                <progress
                  className="progress"
                  value={status.progress}
                  max="100"
                ></progress>
              </div>
              <span className="flex-grow-[4]">
                <StatusIcon status={status.status} />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const StatusIcon = ({ status }: { status: UploadStatus["status"] }) => {
  if (status === "done") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  if (status === "error") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-800"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
};
