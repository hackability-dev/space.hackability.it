import { Field } from "react-final-form";

interface InputFieldProps {
  name: string;
  label: string;
  help?: string;
  max?: number;
  numRows?: number;
}

export const InputField = ({
  label,
  name,
  max,
  numRows,
  help,
}: InputFieldProps) => (
  <Field
    type="text"
    name={name}
    id={name}
    render={({ input, meta }) => {
      return (
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
          {numRows ? (
            <textarea
              {...input}
              rows={numRows}
              className="border-1 input textarea-bordered textarea-primary h-auto w-full border-gray-300 py-2"
            />
          ) : (
            <input
              className="input-bordered input-primary input w-full border-gray-300"
              {...input}
            />
          )}
          <label className="label">
            {meta.error ? (
              <span className="label-text-alt text-error">{meta.error}</span>
            ) : (
              <span className="label-text-alt">{help}</span>
            )}
            {max && (
              <span className="label-text-alt">
                {input.value.length} / {max}
              </span>
            )}
          </label>
        </div>
      );
    }}
  />
);
