// email-sender.ts

import { KannonCli } from "kannon.js";

export function createKannonClient(config: {
  KANNON_DOMAIN: string;
  KANNON_KEY: string;
  KANNON_ALIAS: string;
  KANNON_EMAIL: string;
  KANNON_REST_API_URL?: string;
}) {
  const baseUrl = config.KANNON_REST_API_URL ?? "https://api.kannon.email";
  return new KannonCli(
    config.KANNON_DOMAIN,
    config.KANNON_KEY,
    { alias: config.KANNON_ALIAS, email: config.KANNON_EMAIL },
    { endpoint: `${baseUrl.replace(/\/+$/, "")}/v1` }
  );
}

const templates = {
  wellcomeUser: {
    id: "template_cld2wru4b001v01ctu8393gqo@k.hackability.it",
    subject: "Wellcome in Space Hackability 🔨👨‍🦽!",
  },
} as const;

export class EmailSender {
  constructor(private readonly kannonCli: KannonCli) {}

  sendWellcomeUserEmail(email: string, name: string) {
    return this.kannonCli.sendTemplate(
      [{ email, fields: { name } }],
      templates.wellcomeUser.subject,
      templates.wellcomeUser.id
    );
  }
}
