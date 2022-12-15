import { type EditorData } from "../../ui/editor/schema";
import { resizeCloudinaryImage } from "../../utils/cloudinary-image";
import type { RenderedProject } from "../server/render";
import { ProjectFiles } from "./project-files";

interface ProjectViewProps {
  project: RenderedProject;
}

export const ProjectView = ({ project }: ProjectViewProps) => {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full">
        <div
          className="relative mx-auto h-full max-w-prose text-lg"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full translate-x-32 transform"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <img
            className="m-auto my-10"
            src={resizeCloudinaryImage(project.previewImage, 800)}
            alt={project.name}
          />
          <h1>
            <span className="block text-center text-base font-semibold uppercase tracking-wide text-green-600">
              Hackability Space
            </span>
            <span className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {project.name}
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500">
            {project.description}
          </p>
        </div>
        <div className="prose-lg prose-indigo prose mx-auto mt-6 text-gray-500">
          <h3>Che problema risolve?</h3>
          <p>{project.why}</p>
          <h3>Come funziona?</h3>
          <p>{project.what}</p>
          <h3>Come è stato fatto?</h3>
          <p>{project.how}</p>
        </div>
        <div className="prose-lg prose-indigo prose mx-auto mt-6 text-gray-500">
          <RenderBlocks blocks={project.body.blocks} />
        </div>
      </div>

      <div className="relative mt-10 px-4 sm:px-6 lg:px-8">
        {project.steps.map((step, idx) => (
          <ProjectStepView step={step} key={idx} />
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-3xl text-gray-500">
        <ProjectFiles projectId={project.id} />
      </div>
    </div>
  );
};

const ProjectStepView = ({
  step,
}: {
  step: RenderedProject["steps"][number];
}) => {
  return (
    <div className="mx-auto mt-2 max-w-prose text-lg">
      <div className="mx-auto max-w-prose text-lg">
        {step.previewImage && (
          <img
            className="m-auto my-10"
            src={resizeCloudinaryImage(step.previewImage, 800)}
            alt={step.title}
          />
        )}
        <h2 className="mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          <span>{step.title}</span>
        </h2>
        <p className="mt-8 text-xl leading-8 text-gray-500">
          {step.description}
        </p>
        <div className="prose-lg prose-indigo prose mx-auto mt-6 text-gray-500">
          <RenderBlocks blocks={step.body.blocks} />
        </div>
      </div>
    </div>
  );
};

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
      return <p>{block.data.text}</p>;
    case "header":
      switch (block.data.level) {
        case 1:
          return <h1>{block.data.text}</h1>;
        case 2:
          return <h2>{block.data.text}</h2>;
        case 3:
          return <h3>{block.data.text}</h3>;
        case 4:
          return <h4>{block.data.text}</h4>;
        case 5:
          return <h5>{block.data.text}</h5>;
        case 6:
          return <h6>{block.data.text}</h6>;
      }
    case "image":
      return <img src={block.data.file.url} alt={block.data.caption} />;
    case "embed":
      if (block.data.service === "youtube") {
        return <embed className="aspect-video w-full" src={block.data.embed} />;
      } else {
        <embed className="mx-auto aspect-video" src={block.data.embed} />;
        return (
          <embed
            className="m-auto"
            src={block.data.embed}
            height={block.data.height}
            width={block.data.width}
          />
        );
      }
    case "delimiter":
      return <hr />;
    case "quote":
      return (
        <figure className="not-prose mx-auto max-w-screen-md text-center">
          <svg
            aria-hidden="true"
            className="mx-auto mb-3 h-12 w-12"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium italic">{block.data.text}</p>
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center space-x-3">
            <div className="flex items-center divide-x-2 ">
              <cite className="pr-3 font-medium ">{block.data.caption}</cite>
            </div>
          </figcaption>
        </figure>
      );
    case "code":
      return (
        <pre>
          <code>{block.data.code}</code>
        </pre>
      );
    case "table":
      return (
        <table>
          <thead>
            <tr>
              {block.data.content[0]?.map((cell) => (
                <th key={cell}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.data.content.slice(1).map((row, idx) => (
              <tr key={idx}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "list":
      if (block.data.style === "ordered") {
        return (
          <ol>
            {block.data.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul>
          {block.data.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
  return <pre>{JSON.stringify(block, null, 2)}</pre>;
};
