import cuid from "cuid";
import { parse } from "node-html-parser";
import type { z } from "zod";
import type { BlocksSchema } from "../src/ui/editor/schema";

export const html2Blocks = (input: string) => {
  const html = parse(input);

  const blocks: z.TypeOf<typeof BlocksSchema>[] = [];

  html.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      const el = node as any;
      const tag = el.rawTagName as string;
      const text = el.rawText as string;

      if (tag === "p") {
        blocks.push({
          id: cuid(),
          type: "paragraph",
          data: {
            text,
          },
        });
      } else if (tag === "h1") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 1,
          },
        });
      } else if (tag === "h2") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 2,
          },
        });
      } else if (tag === "h3") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 3,
          },
        });
      } else if (tag === "h4") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 4,
          },
        });
      } else if (tag === "h5") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 5,
          },
        });
      } else if (tag === "h6") {
        blocks.push({
          id: cuid(),
          type: "header",
          data: {
            text,
            level: 6,
          },
        });
      } else if (tag === "ul") {
        blocks.push({
          id: cuid(),
          type: "list",
          data: {
            style: "unordered",
            items: el.childNodes.map((li: any) => li.rawText),
          },
        });
      } else if (tag === "ol") {
        blocks.push({
          id: cuid(),
          type: "list",
          data: {
            style: "ordered",
            items: el.childNodes.map((li: any) => li.rawText),
          },
        });
      } else {
        console.log("not parse", tag, text);
      }
    }
  });

  return blocks;
};
