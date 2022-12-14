import deepEqual from "fast-deep-equal";
import arrayMutators from "final-form-arrays";
import { useCallback, useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import type { z } from "zod";
import { formatBytes } from "../../utils/bytes";
import { cloudinaryUploadImage } from "../../utils/cloudinary";
import { trpc } from "../../utils/trpc";
import { validateZodSchema } from "../../utils/validate-zod";
import { ProjectSchema } from "../schema";
import EditorField from "./editor";
import { CharCounter, ErrOrDescription } from "./forms-utils";
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
      render={({ handleSubmit, valid }) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="mt-6 text-lg font-medium leading-6 text-gray-900">
                  Informazioni generali sul progetto
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6">
                <Field<string>
                  name="name"
                  id="name"
                  render={({ input, meta }) => (
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome del progetto
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          {...input}
                          type="text"
                          autoComplete="name"
                          className="block w-full min-w-0 flex-1 rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-between">
                        <ErrOrDescription
                          meta={meta}
                          description="Titolo del progetto"
                        />
                        <CharCounter max={50} current={input.value.length} />
                      </div>
                    </div>
                  )}
                ></Field>
                <Field<string>
                  id="description"
                  name="description"
                  render={({ input, meta }) => (
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descrizione del progetto
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...input}
                          rows={3}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-between">
                        <ErrOrDescription
                          meta={meta}
                          description=" Scrivi una breve presentazione del tuo progetto"
                        />
                        <CharCounter max={400} current={input.value.length} />
                      </div>
                    </div>
                  )}
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
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <Field<string>
                  id="why"
                  name="why"
                  render={({ input, meta }) => (
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="why"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Perchè hai sviluppato questo progetto?
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...input}
                          rows={3}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-between">
                        <ErrOrDescription
                          meta={meta}
                          description="Descrivi il bisgno"
                        />
                        <CharCounter max={400} current={input.value.length} />
                      </div>
                    </div>
                  )}
                />
                <Field<string>
                  id="what"
                  name="what"
                  render={({ input, meta }) => (
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="what"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cosa fa?
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...input}
                          rows={3}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-between">
                        <ErrOrDescription
                          meta={meta}
                          description="Descrivi come il bisogno viene risolto"
                        />
                        <CharCounter max={400} current={input.value.length} />
                      </div>
                    </div>
                  )}
                />

                <Field<string>
                  id="how"
                  name="how"
                  render={({ input, meta }) => (
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="how"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descrizione del progetto
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...input}
                          rows={3}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-between">
                        <ErrOrDescription
                          meta={meta}
                          description="diy, hacking, arduino, 3D printed, casted, etc."
                        />
                        <CharCounter max={400} current={input.value.length} />
                      </div>
                    </div>
                  )}
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
                disabled={!valid || isSubmitting}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {isSubmitting ? "Sto salvando..." : "Salva"}
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
  uploadImage: (file: Blob) => Promise<string>;
  remove: () => void;
}

const StepForm = ({ name, uploadImage, remove }: StepFormProps) => {
  return (
    <div className="rounded-lg bg-gray-200 p-4 shadow-lg">
      <Field<string>
        name={`${name}.title`}
        id={`${name}.title`}
        render={({ input, meta }) => (
          <div className="sm:col-span-4">
            <label
              htmlFor={`${name}.title`}
              className="block text-sm font-medium text-gray-700"
            >
              Titolo
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                {...input}
                type="text"
                autoComplete="name"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <ErrOrDescription
                meta={meta}
                description="Dai un titolo al passo"
              />
              <CharCounter max={50} current={input.value.length} />
            </div>
          </div>
        )}
      ></Field>
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
      <Field<string>
        id={`${name}.description`}
        name={`${name}.description`}
        render={({ input, meta }) => (
          <div className="sm:col-span-6">
            <label
              htmlFor={`${name}.description`}
              className="block text-sm font-medium text-gray-700"
            >
              Info
            </label>
            <div className="mt-1">
              <textarea
                {...input}
                rows={3}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <ErrOrDescription
                meta={meta}
                description="Descrivi brevemente lo step"
              />
              <CharCounter max={400} current={input.value.length} />
            </div>
          </div>
        )}
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
