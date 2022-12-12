import { TRPCError } from "@trpc/server";
import { sendNotification } from "services/telegram";
import { createRouter } from "./router";

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    const user = ctx.user;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "use required",
      });
    }
    return next({
      ctx: {
        ...ctx,
        user: user,
      },
    });
  })
  .mutation("makeMeEditor", {
    async resolve({ ctx }) {
      sendNotification(`🚀 ${ctx.user.email} chiede di diventare editor`);
    },
  });
