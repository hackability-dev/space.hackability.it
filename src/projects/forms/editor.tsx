import { Field } from "react-final-form";
import { Editor } from "../../ui/editor/import";

interface EditorFieldProps {
  name: string;
  uploadImage: (file: Blob) => Promise<string>;
}

const EditorField = ({ name, uploadImage }: EditorFieldProps) => {
  return (
    <Field
      name={name}
      render={(props) => {
        return (
          <>
            <Editor
              initialValue={props.input.value}
              onChange={(data) => {
                props.input.onChange(data);
              }}
              uploadImage={uploadImage}
            />
          </>
        );
      }}
    />
  );
};

export default EditorField;
