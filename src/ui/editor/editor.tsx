import EditorJS from "@editorjs/editorjs";
import cuid from "cuid";
import { useEffect, useRef, useState } from "react";
import { type EditorData, EditorDataSchema } from "./schema";

const Editor = ({
  uploadImage,
  onChange,
  initialValue = {
    blocks: [],
  },
}: {
  uploadImage: (file: Blob) => Promise<string>;
  onChange: (data: EditorData) => void | Promise<void>;
  initialValue?: EditorData;
}) => {
  const [id] = useState(cuid());
  const ref = useRef<EditorJS | null>();

  useEffect(() => {
    if (!ref.current) {
      const { editor } = initEditor(id, initialValue, onChange, uploadImage);
      ref.current = editor;
    }
    () => {
      ref.current?.clear();
      ref.current?.destroy();
      ref.current = null;
    };
  });

  return (
    <div className="prose-sm prose w-full min-w-full rounded p-0 py-5 shadow-lg  prose-img:m-0">
      <div className="w-auto" id={id}></div>
    </div>
  );
};

export default Editor;

const initEditor = (
  id: string,
  initialValue: EditorData,
  onChange: (data: EditorData) => void | Promise<void>,
  uploadImage: (file: Blob) => Promise<string>
) => {
  const editor = new EditorJS({
    minHeight: 0,
    holder: id,
    data: initialValue,
    onChange: async (api) => {
      const data = await api.saver.save();
      onChange(EditorDataSchema.parse(data));
    },
    tools: {
      header: require("@editorjs/header"),
      delimiter: require("@editorjs/delimiter"),
      list: require("@editorjs/list"),
      table: require("@editorjs/table"),
      quote: require("@editorjs/quote"),
      embed: require("@editorjs/embed"),
      code: require("@editorjs/code"),
      image: {
        class: require("@editorjs/image"),
        config: {
          uploader: {
            async uploadByFile(file: File) {
              const url = await uploadImage(file);
              return {
                success: 1,
                file: {
                  url: url,
                },
              };
            },
          },
        },
      },
    },
  });
  return {
    editor,
  };
};
