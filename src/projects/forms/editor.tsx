import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { Field } from "react-final-form";

interface EditorFieldProps {
  name: string;
  uploadImage: (file: Blob) => Promise<string>;
}

const EditorField = ({ name, uploadImage }: EditorFieldProps) => {
  const editorRef = useRef<Editor>();
  return (
    <Field
      name={name}
      render={(props) => {
        return (
          <Editor
            ref={editorRef as any}
            initialValue={props.input.value || " "}
            previewStyle="vertical"
            height="calc(100%)"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hideModeSwitch={true}
            onChange={() => {
              const body = editorRef.current
                ?.getInstance()
                .getMarkdown()
                .replaceAll("<br>", "");

              props.input.onChange(body);
            }}
            hooks={{
              async addImageBlobHook(blob, cb) {
                const res = await uploadImage(blob);
                cb(res);
              },
            }}
          />
        );
      }}
    />
  );
};

export default EditorField;
