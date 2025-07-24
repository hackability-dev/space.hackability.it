// ============================================================================
// PROJECT VIEW COMPONENT
// ============================================================================
// Main component for displaying project details with sections for overview,
// detailed documentation, step-by-step guide, and file resources.

import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { type EditorData } from "../../ui/editor/schema";
import { formatBytes } from "../../utils/bytes";
import { resizeCloudinaryImage } from "../../utils/cloudinary-image";
import { trpc } from "../../utils/trpc";
import type { RenderedProject } from "../server/render";

// ============================================================================
// TYPES AND INTERFACES
// ============================================================================

export const ProjectView = ({ project }: ProjectViewProps) => {
  return (
    <div className="space-y-20 bg-gray-50">
      <HeroSection project={project} />
      <ProjectImageSection project={project} />
      <div className="mt-5"></div>
      <OverviewSection project={project} />
      <div className="mt-5"></div>
      <DetailedDocumentationSection project={project} />
      <div className="mt-5"></div>
      <BuildStepsSection project={project} />
      <div className="mt-5"></div>
      <ProjectFilesSection project={project} />
    </div>
  );
};

interface ProjectViewProps {
  project: RenderedProject;
}

interface ProjectFilesTableProps {
  projectId: string;
  downloadFile: (projectId: string, filename: string) => void;
  files?: {
    filename: string;
    size: number;
    type: string;
  }[];
}

// ============================================================================
// HERO SECTION COMPONENT
// ============================================================================

function HeroSection({ project }: { project: RenderedProject }) {
  return (
    <div className="relative bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="text-center">
          <div className="mb-8">
            <span className="mb-6 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Progetto Hackability
            </span>
          </div>
          <h1 className="mb-8 text-4xl font-bold text-gray-900 sm:text-5xl">
            {project.name}
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-600">
            {project.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-6 text-sm text-gray-500 sm:flex-row">
            <div className="flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Autore: {project.author}
            </div>
            <div className="flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Creato: {new Date(project.createdAt).toLocaleDateString("it-IT")}
            </div>
            <div className="flex items-center">
              <svg
                className="mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Licenza: {project.license.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT IMAGE SECTION COMPONENT
// ============================================================================

function ProjectImageSection({ project }: { project: RenderedProject }) {
  return (
    <div className="mx-auto -mt-8 max-w-4xl px-6 sm:px-8 lg:px-10">
      <div className="relative">
        <img
          className="h-96 w-full rounded-xl object-cover shadow-2xl"
          src={resizeCloudinaryImage(project.previewImage, 1200)}
          alt={project.name}
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}

// ============================================================================
// OVERVIEW SECTION COMPONENT
// ============================================================================

function OverviewSection({ project }: { project: RenderedProject }) {
  return (
    <div
      id="overview"
      className="mx-auto mt-20 max-w-4xl px-6 sm:px-8 lg:px-10"
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Panoramica del Progetto
          </h2>
        </div>
        <div className="space-y-12 px-10 py-12">
          <div>
            <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-900">
              <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-3 w-3 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Che problema risolve?
            </h3>
            <p className="pl-10 text-lg leading-relaxed text-gray-700">
              {project.why}
            </p>
          </div>

          <div>
            <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-900">
              <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Come funziona?
            </h3>
            <p className="pl-10 text-lg leading-relaxed text-gray-700">
              {project.what}
            </p>
          </div>

          <div>
            <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-900">
              <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-3 w-3 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Come è stato fatto?
            </h3>
            <p className="pl-10 text-lg leading-relaxed text-gray-700">
              {project.how}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// DETAILED DOCUMENTATION SECTION COMPONENT
// ============================================================================

function DetailedDocumentationSection({
  project,
}: {
  project: RenderedProject;
}) {
  const hasDetailedContent =
    project.body.blocks && project.body.blocks.length > 0;

  if (!hasDetailedContent) {
    return null;
  }

  return (
    <div id="details" className="mx-auto mt-20 max-w-4xl px-6 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-green-50 to-teal-50 px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Documentazione Dettagliata
          </h2>
        </div>
        <div className="px-10 py-12">
          <div className="prose prose-lg prose-indigo max-w-none">
            <RenderBlocks blocks={project.body.blocks} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// BUILD STEPS SECTION COMPONENT
// ============================================================================

function BuildStepsSection({ project }: { project: RenderedProject }) {
  const hasSteps = project.steps.length > 0;

  if (!hasSteps) {
    return null;
  }

  return (
    <div id="steps" className="mx-auto mt-20 max-w-4xl px-6 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Guida Passo-Passo
          </h2>
          <p className="mt-2 text-gray-600">
            Segui questi passaggi per realizzare il progetto
          </p>
        </div>
        <div className="space-y-16 px-10 py-12">
          {project.steps.map((step, idx) => (
            <ProjectStepView step={step} stepNumber={idx + 1} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PROJECT FILES SECTION COMPONENT
// ============================================================================

function ProjectFilesSection({ project }: { project: RenderedProject }) {
  const { data: files } = trpc.files.getProjectFiles.useQuery({
    projectId: project.id,
  });
  const hasFiles = files && files.length > 0;

  if (!hasFiles) {
    return null;
  }

  return (
    <div
      id="files"
      className="mx-auto mt-20 max-w-4xl px-6 pb-20 sm:px-8 lg:px-10"
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-slate-50 px-10 py-8">
          <h2 className="text-2xl font-bold text-gray-900">File e Risorse</h2>
          <p className="mt-2 text-gray-600">
            Download dei file necessari per il progetto
          </p>
        </div>
        <div className="px-10 py-12">
          <ProjectFiles projectId={project.id} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PROJECT VIEW COMPONENT
// ============================================================================

// ============================================================================
// PROJECT STEP COMPONENT
// ============================================================================
// Component for rendering individual steps in the build guide

const ProjectStepView = ({
  step,
  stepNumber,
}: {
  step: RenderedProject["steps"][number];
  stepNumber: number;
}) => {
  return (
    <div className="relative">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {stepNumber}
          </div>
        </div>
        <div className="ml-6 flex-1">
          <div className="mb-6">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              {step.title}
            </h3>
            <p className="text-lg leading-relaxed text-gray-600">
              {step.description}
            </p>
          </div>

          {step.previewImage && (
            <div className="mb-8">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  className="h-64 w-full object-cover"
                  src={resizeCloudinaryImage(step.previewImage, 800)}
                  alt={step.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          )}

          <div className="prose prose-lg prose-gray max-w-none">
            <RenderBlocks blocks={step.body.blocks} />
          </div>
        </div>
      </div>

      {/* Connector line for next step */}
      <div className="absolute left-6 top-12 h-full w-0.5 -translate-x-0.5 bg-gray-200"></div>
    </div>
  );
};

// ============================================================================
// PROJECT FILES COMPONENTS
// ============================================================================
// Components for displaying and downloading project files

const ProjectFiles = ({ projectId }: { projectId: string }) => {
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
    />
  );
};

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
      <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Nome File
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Dimensione
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Tipo
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Azioni
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {files.map((file) => (
            <tr key={file.filename} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {file.filename}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {formatBytes(file.size)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {file.type.toUpperCase()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => downloadFile(projectId, file.filename)}
                  title={`Scarica ${file.filename}`}
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// CONTENT RENDERING COMPONENTS
// ============================================================================
// Components for rendering Editor.js blocks with proper styling

const RenderBlocks = ({ blocks }: { blocks: EditorData["blocks"] }) => {
  return (
    <div>
      {blocks.map((block) => (
        <RenderBlock key={block.id} {...block} />
      ))}
    </div>
  );
};

const RenderBlock = (block: EditorData["blocks"][number]) => {
  switch (block.type) {
    case "paragraph":
      return <p className="mb-4 leading-relaxed">{block.data.text}</p>;
    case "header":
      const headerClass = "font-bold text-gray-900 mt-8 mb-4";
      switch (block.data.level) {
        case 1:
          return (
            <h1 className={`text-3xl ${headerClass}`}>{block.data.text}</h1>
          );
        case 2:
          return (
            <h2 className={`text-2xl ${headerClass}`}>{block.data.text}</h2>
          );
        case 3:
          return (
            <h3 className={`text-xl ${headerClass}`}>{block.data.text}</h3>
          );
        case 4:
          return (
            <h4 className={`text-lg ${headerClass}`}>{block.data.text}</h4>
          );
        case 5:
          return (
            <h5 className={`text-base ${headerClass}`}>{block.data.text}</h5>
          );
        case 6:
          return (
            <h6 className={`text-sm ${headerClass}`}>{block.data.text}</h6>
          );
      }
    case "image":
      return (
        <figure className="my-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={block.data.file.url}
              alt={block.data.caption}
              className="h-auto w-full object-cover"
            />
          </div>
          {block.data.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-gray-500">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );
    case "embed":
      if (block.data.service === "youtube") {
        return (
          <div className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="h-full w-full"
                src={block.data.embed}
                title="YouTube video"
                allowFullScreen
              />
            </div>
          </div>
        );
      } else {
        return (
          <div className="my-8 flex justify-center">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <iframe
                src={block.data.embed}
                height={block.data.height}
                width={block.data.width}
                title="Embedded content"
                className="max-w-full"
              />
            </div>
          </div>
        );
      }
    case "delimiter":
      return (
        <div className="my-12 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          </div>
        </div>
      );
    case "quote":
      return (
        <div className="my-8 rounded-r-lg border-l-4 border-indigo-500 bg-gray-50 p-6">
          <blockquote>
            <p className="mb-4 text-lg font-medium italic text-gray-900">
              &ldquo;{block.data.text}&rdquo;
            </p>
            {block.data.caption && (
              <cite className="text-sm font-medium text-gray-600">
                — {block.data.caption}
              </cite>
            )}
          </blockquote>
        </div>
      );
    case "code":
      return (
        <div className="my-6">
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-6 text-gray-100">
            <code className="font-mono text-sm">{block.data.code}</code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                {block.data.content[0]?.map((cell, index) => (
                  <th
                    key={index}
                    className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {block.data.content.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "list":
      const listClass = "my-4 space-y-2";
      const itemClass = "flex items-start";
      if (block.data.style === "ordered") {
        return (
          <ol className={`${listClass} counter-reset-list list-none`}>
            {block.data.items.map((item, index) => (
              <li key={index} className={itemClass}>
                <span className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-800">
                  {index + 1}
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className={`${listClass} list-none`}>
          {block.data.items.map((item, index) => (
            <li key={index} className={itemClass}>
              <span className="mr-3 mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500"></span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      );
  }
  return (
    <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-4">
      <p className="mb-2 text-sm font-medium text-red-800">
        Tipo di contenuto non supportato:
      </p>
      <pre className="overflow-x-auto text-xs text-red-600">
        {JSON.stringify(block, null, 2)}
      </pre>
    </div>
  );
};
