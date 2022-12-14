import { type FieldMetaState } from "react-final-form";

export const ErrOrDescription = ({
  meta,
  description,
}: {
  meta: FieldMetaState<any>;
  description: string;
}) => {
  if (meta.error && meta.touched) {
    return <p className="mt-1 text-sm text-red-500">{meta.error}</p>;
  }
  return <p className="mt-1 text-sm text-gray-500">{description}</p>;
};

export const CharCounter = ({
  max,
  current,
}: {
  max: number;
  current: number;
}) => {
  return (
    <p
      className={`mt-2 text-sm text-gray-500 ${
        current > max && "text-red-500"
      }`}
    >
      {current}/{max}
    </p>
  );
};
