// email-sender.ts

import type { KannonCli } from "kannon.js";

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
