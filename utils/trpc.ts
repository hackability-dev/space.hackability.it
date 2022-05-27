import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "src/api/mod";

export const trpc = createReactQueryHooks<AppRouter>();
