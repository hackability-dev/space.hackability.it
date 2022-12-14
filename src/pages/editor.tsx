import { Editor } from "../ui/editor/import";

const EditorPage = () => {
  return (
    <Editor
      initialValue={{
        blocks: [
          {
            type: "header",
            data: {
              text: "Hello World",
              level: 2,
            },
          },
        ],
      }}
      onChange={(v) => console.log(v)}
      uploadImage={async () => "ciao"}
    />
  );
};

export default EditorPage;
