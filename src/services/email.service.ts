import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { emailTemplateConstant } from "../constans";
import { EEmailAction } from "../enums";
import { hbsOptional, nodemailerOptional } from "../options";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(nodemailerOptional);
    this.transporter.use("compile", hbs(hbsOptional));
  }

  public async sendMail(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    const { subject, template } = emailTemplateConstant[emailAction];
    const emailOptions = {
      to: email,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(emailOptions);
  }
}

const emailService = new EmailService();

export { emailService };
