import { z } from "zod";

export const validateZodSchema =
  <T = any>(schema: z.Schema<T> | undefined) =>
  (values: T) => {
    if (!schema) {
      return {};
    }
    try {
      schema.parse(values);
      return {};
    } catch (e) {
      const err = e as z.ZodError;
      return err.errors.reduce(
        (prev, e) => ({ ...prev, [e.path[0]]: e.message }),
        {}
      );
    }
  };
