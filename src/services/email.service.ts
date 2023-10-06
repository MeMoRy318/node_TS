import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { emailTemplate, options, transport } from "../constans";
import { EEmailAction } from "../enums";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(transport);
    this.transporter.use("compile", hbs(options));
  }

  public async sendEmail(
    email: string,
    emailAction: EEmailAction,
    context: Record<string, string | number> = {},
  ) {
    const { template, subject } = emailTemplate[emailAction];
    const mailOptionals = {
      to: email,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(mailOptionals);
  }
}

const emailService = new EmailService();

export { emailService };
