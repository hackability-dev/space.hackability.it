import { MDXRemote } from "next-mdx-remote";
import { resizeCloudinaryImage } from "../../utils/cloudinary-image";
import { RenderedProject } from "../server/render";
import { ProjectFiles } from "./project-files";

interface ProjectViewProps {
  project: RenderedProject;
}

const components: any = {
  img: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={resizeCloudinaryImage(src, 1200)} className="m-auto" />
  ),
};

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
        <div className="prose prose-indigo prose-lg mx-auto mt-6 text-gray-500">
          <h3>Che problema risolve?</h3>
          <p>{project.why}</p>
          <h3>Come funziona?</h3>
          <p>{project.what}</p>
          <h3>Come è stato fatto?</h3>
          <p>{project.how}</p>
        </div>
        <div className="prose prose-indigo prose-lg mx-auto mt-6 text-gray-500">
          <MDXRemote {...project.renderedBody} components={components} />
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
        <img
          className="m-auto my-10"
          src={resizeCloudinaryImage(step.previewImage, 800)}
          alt={step.title}
        />
        <h2 className="mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          <span>{step.title}</span>
        </h2>
        <p className="mt-8 text-xl leading-8 text-gray-500">
          {step.description}
        </p>
        <div className="prose prose-indigo prose-lg mx-auto mt-6 text-gray-500">
          <MDXRemote {...step.body} components={components} />
        </div>
      </div>
    </div>
  );
};
