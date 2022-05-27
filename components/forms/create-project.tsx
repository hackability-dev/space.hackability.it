import { Field, Form } from "react-final-form";
import { CreateProjectSchema } from "src/projects/schema";
import { validateZodSchema } from "utils/validate-zod";
import { z } from "zod";
import { CharCounter, ErrOrDescription } from "./forms-utils";

type CreateProjectValue = z.TypeOf<typeof CreateProjectSchema>;

interface ProjectFormProps {
  initialValues?: Partial<CreateProjectValue>;
  onSubmit: (values: CreateProjectValue) => void;
  abort: () => void;
}

export const CreateProjectForm = ({
  onSubmit,
  abort,
  initialValues,
}: ProjectFormProps) => {
  return (
    <Form
      validate={validateZodSchema(CreateProjectSchema)}
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, valid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
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
                    className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0  rounded-md sm:text-sm border-gray-300"
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
          />
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={abort}
                className="disabled:cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={!valid}
                className="ml-3 disabled:bg-indigo-400 disabled:cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};
