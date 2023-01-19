import deepEqual from "fast-deep-equal";
import arrayMutators from "final-form-arrays";
import { useCallback, useState } from "react";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import type { z } from "zod";
import { InputField } from "../../forms/input-field";
import { formatBytes } from "../../utils/bytes";
import { cloudinaryUploadImage } from "../../utils/cloudinary";
import { trpc } from "../../utils/trpc";
import { validateZodSchema } from "../../utils/validate-zod";
import { ProjectSchema } from "../schema";
import EditorField from "./editor";
import { FeatureImageField } from "./image";
import { UploadFilesFields } from "./upload-files";

type ProjectValue = z.TypeOf<typeof ProjectSchema>;

interface ProjectFormProps {
  projectId: string;
  initialValues?: Partial<ProjectValue>;
  onSubmit: (values: ProjectValue) => Promise<void>;
}

export const ProjectForm = ({
  onSubmit,
  initialValues,
  projectId,
}: ProjectFormProps) => {
  const { mutateAsync: getUploadSignature } =
    trpc.project.generateCloudinaryUploadSignature.useMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadImage = useCallback(
    (file: Blob) => {
      return cloudinaryUploadImage(file, () =>
        getUploadSignature({ projectId })
      );
    },
    [getUploadSignature, projectId]
  );

  return (
    <Form<z.TypeOf<typeof ProjectSchema>>
      onSubmit={async (value) => {
        setIsSubmitting(true);
        try {
          await onSubmit(value);
        } catch (e) {
          console.error(e);
        }
        setIsSubmitting(false);
      }}
      validate={validateZodSchema(ProjectSchema)}
      initialValues={initialValues}
      initialValuesEqual={deepEqual}
      mutators={{
        ...arrayMutators,
      }}
      render={({ handleSubmit, valid, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 flex flex-col gap-y-6">
                <InputField name="name" label="Titolo del progetto" max={50} />
                <InputField
                  name="description"
                  label="Descrizione del progetto"
                  help="Verrà visualizzata come anteprima"
                  max={400}
                  numRows={3}
                />

                <div className="sm:col-span-6">
                  <label
                    htmlFor="previewImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Immagine di copertina del progetto
                  </label>

                  <FeatureImageField
                    name="previewImage"
                    uploadImage={uploadImage}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Perchè il tuo progetto esiste?
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Rispondi a questo domande per dare informazioni agli utenti
                  del perchè del tuo progetto.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <InputField
                  name="why"
                  label="Perchè hai sviluppato questo progetto?"
                  help="Per chi è stato sviluppato il progetto? Qual è il suo bisogno?"
                  max={400}
                  numRows={3}
                />

                <InputField
                  name="what"
                  label="Cosa fa?"
                  help="In che modo il bisogno è stato risolto?"
                  max={400}
                  numRows={3}
                />

                <InputField
                  name="how"
                  label="Come è stato fatto?"
                  help="Che tecnologie servono per riprodurlo? Diy, hacking, arduino, 3D printed, casted, etc."
                  max={400}
                  numRows={3}
                />
              </div>
            </div>

            <div className="pt-10">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Descrizione del progetto
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Descrivi dettagliamente il tuo progetto inserendo immagini e
                  video
                </p>
              </div>
              <div className="mt-4">
                <EditorField name="body" uploadImage={uploadImage} />
              </div>
            </div>

            <div className="pt-10">
              <ProjectFileUpload projectId={projectId} />
            </div>

            <div className="pt-10">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Come riprodurre il progetto?
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Dividi il progetto in passi semplici! E descrivi i singoli
                  passi
                </p>
              </div>
              <FieldArray name="buildSteps">
                {({ fields }) => (
                  <div>
                    {fields.map((name, index) => (
                      <div className="mt-4" key={index}>
                        <StepForm
                          index={index}
                          name={name}
                          remove={() => fields.remove(index)}
                          uploadImage={uploadImage}
                        />
                      </div>
                    ))}

                    <div className="mt-2 flex justify-end">
                      <button
                        type="button"
                        className="rounded bg-indigo-600 px-2 py-1 text-sm text-white hover:bg-indigo-800 "
                        onClick={() => fields.push({})}
                      >
                        Aggiungi
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!valid || submitting}
                className="btn-primary btn-sm btn"
              >
                {submitting ? "Sto salvando..." : "Salva"}
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

const ProjectFileUpload = ({ projectId }: { projectId: string }) => {
  const { data: files, refetch } = trpc.files.getProjectFiles.useQuery({
    projectId,
  });

  const { mutateAsync: getDownloadUrl } =
    trpc.files.getDownloadFileUrl.useMutation();

  const { mutateAsync: deleteFileMut } = trpc.project.deleteFile.useMutation();

  const downloadFile = useCallback(
    async (projectId: string, fileName: string) => {
      const url = await getDownloadUrl({ projectId, fileName });
      if (url) {
        window.open(url, "_blank");
      }
    },
    [getDownloadUrl]
  );

  const deleteFile = useCallback(
    async (projectId: string, fileName: string) => {
      await deleteFileMut({ projectId, fileName });
      await refetch();
    },
    [deleteFileMut, refetch]
  );

  return (
    <>
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">File</h3>
        <p className="mt-1 text-sm text-gray-500">
          Carica qui tutti i file che servono per riprodurre il progetto, e.g.
          modelli 3D ,codice etc.
        </p>
      </div>
      <div className="mt-2">
        <UploadFilesFields
          projectId={projectId}
          onUploadCompleted={async () => {
            refetch();
          }}
          onUploadFileCompleted={async () => {
            refetch();
          }}
        />
      </div>
      <p className="mt-1 text-sm text-yellow-800">
        Per favore, non intasare la piattaforma caricando video dimostrativi,
        usa Youtube per questo!
      </p>
      <div className="mt-4">
        <ProjectsFileList
          files={files?.map((f) => ({
            filename: f.name.split("/").pop()!,
            size: Number(f.size),
            type: "t",
          }))}
          downloadFile={downloadFile}
          deleteFile={deleteFile}
          projectId={projectId}
        ></ProjectsFileList>
      </div>
    </>
  );
};
interface ProjectsFileListProps {
  projectId: string;
  files?: {
    filename: string;
    size: number;
    type: string;
  }[];
  downloadFile: (projectId: string, filename: string) => void;
  deleteFile: (projectId: string, filename: string) => void;
}

const ProjectsFileList = ({
  files,
  projectId,
  downloadFile,
  deleteFile,
}: ProjectsFileListProps) => {
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
              <td>{file.filename.split(".").pop()}</td>
              <td className="flex justify-end">
                <button
                  className="link-primary link"
                  onClick={() => downloadFile(projectId, file.filename)}
                >
                  download
                </button>
                <button
                  className="link ml-2 text-red-600"
                  onClick={() => deleteFile(projectId, file.filename)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface StepFormProps {
  name: string;
  index: number;
  uploadImage: (file: Blob) => Promise<string>;
  remove: () => void;
}

const StepForm = ({ name, uploadImage, remove, index }: StepFormProps) => {
  return (
    <div className="rounded-lg">
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 border-t border-purple-400"></div>
        <div className="relative text-center">
          <span className="w-auto bg-white px-4 text-lg text-primary">
            Step #{index + 1}
          </span>
        </div>
      </div>
      <InputField name={`${name}.title`} label="Titolo" max={50} />
      <div className="sm:col-span-6">
        <label
          htmlFor="previewImage"
          className="block text-sm font-medium text-gray-700"
        >
          Immagine di presentazione dello step
        </label>

        <FeatureImageField
          name={`${name}.previewImage`}
          uploadImage={uploadImage}
        />
      </div>

      <InputField
        name={`${name}.description`}
        label="Info"
        help="Descrivi brevemente lo step"
        max={400}
        numRows={4}
      />

      <div className="mt-4">
        <EditorField name={`${name}.body`} uploadImage={uploadImage} />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-800 "
          onClick={remove}
        >
          Cancella Passo
        </button>
      </div>
    </div>
  );
};
