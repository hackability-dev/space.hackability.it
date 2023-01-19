import { Telegraf } from "telegraf";
import { bold, fmt, type FmtString } from "telegraf/format";

export const telegramConfig = {
  token: process.env.TELEGRAM_TOKEN || "",
  chatID: process.env.TELEGRAM_ADMIN_CHAT_ID || "",
};

export class TelegramNotifier {
  private readonly bot: Telegraf;
  constructor(token: string, private readonly adminChat: string) {
    this.bot = new Telegraf(token);
  }

  async sendToAdmin(message: FmtString | string) {
    await this.bot.telegram.sendMessage(telegramConfig.chatID, message);
  }

  async notifyUserCreated(user: { email: string }) {
    await this.sendToAdmin(
      fmt`🚀 Nuovo utente ${bold(user.email)} registrato!`
    );
  }
}
