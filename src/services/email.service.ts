import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { emailType, options, transport } from "../constans";
import { EEmail } from "../enums";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(transport);
    this.transporter.use("compile", hbs(options));
  }

  public async sendEmail(
    email: string,
    emailAction: EEmail,
    context: Record<string, string | number> = {},
  ): Promise<void> {
    const { subject, template } = emailType[emailAction];
    const mailOptional = {
      to: email,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(mailOptional);
  }
}

const emailService = new EmailService();

export { emailService };
