import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN!);

export const sendNotification = (msg: string) =>
  bot.telegram
    .sendMessage(process.env.TELEGRAM_ADMIN_CHAT_ID!, msg)
    .then((res) => console.log(res));
