import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

import { emailTransport, hbsOptions, templates } from "../constans";
import { EmailEnum } from "../enums";

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(emailTransport);
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendEmail(
    email: string,
    emailType: EmailEnum,
    context: Record<string, string | number>,
  ): Promise<void> {
    const { template, subject } = templates[emailType];

    const mailOptions = {
      to: email,
      subject,
      template,
      context,
    };
    await this.transporter.sendMail(mailOptions);
  }
}

const emailService = new EmailService();

export { emailService };
