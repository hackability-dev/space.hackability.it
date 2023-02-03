import { type z } from "zod";
import { validateZodSchema } from "../../utils/validate-zod";
import { CreateProjectSchema } from "../schema";
import { CharCounter, ErrOrDescription } from "../ui/forms-utils";
import { Field, Form } from "react-final-form";

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
    >
      {({ handleSubmit, invalid }) => (
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
                    className="input-primary input input-sm w-full"
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
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={invalid}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};
