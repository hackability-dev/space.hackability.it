import cuid from "cuid";
import type { z } from "zod";
import { EditorDataSchema } from "../src/ui/editor/schema";
import { parse } from "node-html-parser";
import { html2Blocks } from "./html2data";

interface Text {
  type: "text";
  content: string;
}
interface Img {
  type: "img";
  img: {
    url: string;
    filename: string;
  };
}

interface Video {
  type: "video";
  url: string;
}

type Long = readonly (Text | Img | Video)[];

export function long2md(long: Long) {
  const res: z.TypeOf<typeof EditorDataSchema> = {
    version: "2.26.3",
    blocks: [],
    time: new Date().getTime(),
  };

  for (const section of long) {
    if (section.type === "text") {
      const bs = html2Blocks(section.content);
      res.blocks.push(...bs);
    } else if (section.type === "img") {
      res.blocks.push({
        id: cuid(),
        type: "image",
        data: {
          file: {
            url: section.img.url,
          },
          caption: section.img.filename,
          withBorder: false,
          withBackground: false,
          stretched: false,
        },
      });
    } else if (section.type === "video") {
      const id = section.url.split("/").pop()?.replace("watch?v=", "");
      res.blocks.push({
        id: cuid(),
        type: "embed",
        data: {
          service: "youtube",
          source: `https://www.youtube.com/watch?v=${id}`,
          embed: `https://www.youtube.com/embed/${id}`,
          width: 580,
          height: 320,
          caption: "adasd",
        },
      });
    }
  }

  return EditorDataSchema.parse(res);
}
