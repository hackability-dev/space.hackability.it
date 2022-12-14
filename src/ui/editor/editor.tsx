import EditorJS from "@editorjs/editorjs";
import cuid from "cuid";
import { useEffect, useState } from "react";

const Editor = ({
  uploadImage,
  onChange,
  initialValue,
}: {
  uploadImage: (file: Blob) => Promise<string>;
  onChange: (data: any) => Promise<void>;
  initialValue: any;
}) => {
  const [id] = useState(cuid());

  useEffect(() => {
    const { editor } = initEditor(id, initialValue, onChange, uploadImage);
    () => {
      editor.clear();
      editor.destroy();
    };
  });

  return (
    <div className="prose-sm prose w-full min-w-full rounded  bg-gray-100 p-0 py-5 shadow-lg  prose-img:m-0">
      <div className="w-auto" id={id}></div>
    </div>
  );
};

export default Editor;

const initEditor = (
  id: string,
  initialValue: any,
  onChange: (data: any) => Promise<void>,
  uploadImage: (file: Blob) => Promise<string>
) => {
  const editor = new EditorJS({
    minHeight: 0,
    holder: id,
    data: initialValue,
    onChange: async (api) => {
      const data = await api.saver.save();
      onChange(data);
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
