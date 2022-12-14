import { z } from "zod";

const CodeSchema = z.object({
  id: z.string(),
  type: z.literal("code"),
  data: z.object({
    code: z.string(),
  }),
});

const ParagraphSchema = z.object({
  id: z.string(),
  type: z.literal("paragraph"),
  data: z.object({
    text: z.string(),
  }),
});

const HeaderSchema = z.object({
  id: z.string(),
  type: z.literal("header"),
  data: z.object({
    text: z.string(),
    level: z.union([
      z.literal(1),
      z.literal(2),
      z.literal(3),
      z.literal(4),
      z.literal(5),
      z.literal(6),
    ]),
  }),
});

const DelimiterSchema = z.object({
  id: z.string(),
  type: z.literal("delimiter"),
  data: z.object({}),
});

const TableSchema = z.object({
  id: z.string(),
  type: z.literal("table"),
  data: z.object({
    withHeadings: z.boolean(),
    content: z.array(z.array(z.string())),
  }),
});

const QuoteSchema = z.object({
  id: z.string(),
  type: z.literal("quote"),
  data: z.object({
    text: z.string(),
    caption: z.string(),
    alignment: z.union([
      z.literal("left"),
      z.literal("center"),
      z.literal("right"),
    ]),
  }),
});

const Imagechema = z.object({
  id: z.string(),
  type: z.literal("image"),
  data: z.object({
    file: z.object({
      url: z.string().url(),
    }),
    caption: z.string(),
    withBorder: z.boolean(),
    withBackground: z.boolean(),
    stretched: z.boolean(),
  }),
});

const EmbedSchema = z.object({
  id: z.string(),
  type: z.literal("embed"),
  data: z.object({
    service: z.string(),
    source: z.string(),
    embed: z.string(),
    width: z.number(),
    height: z.number(),
    caption: z.string(),
  }),
});

const Listchema = z.object({
  id: z.string(),
  type: z.literal("list"),
  data: z.object({
    style: z.union([z.literal("ordered"), z.literal("unordered")]),
    items: z.array(z.string()),
  }),
});

export const BlocksSchema = z.discriminatedUnion("type", [
  ParagraphSchema,
  HeaderSchema,
  DelimiterSchema,
  QuoteSchema,
  TableSchema,
  CodeSchema,
  EmbedSchema,
  Imagechema,
  Listchema,
]);

export const EditorDataSchema = z.object({
  time: z.number().int().optional(),
  version: z.string().optional(),
  blocks: z.array(BlocksSchema),
});

export type EditorData = z.infer<typeof EditorDataSchema>;
