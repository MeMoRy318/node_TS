import path from "path";

import { configs } from "../configs";
import { EEmail } from "../enums";

const transport = {
  from: "No reply",
  service: "gmail",
  auth: {
    user: configs.NODEMAILER_EMAIL,
    pass: configs.NODEMAILER_PASSWORD,
  },
};

const options = {
  extName: ".hbs",
  viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
  viewEngine: {
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "email-templates", "layouts"),
    partialsDir: path.join(process.cwd(), "src", "email-templates", "partials"),
  },
};

const emailType = {
  [EEmail.REGISTER]: {
    subject: "Register",
    template: "register",
  },
  [EEmail.FORGOT_PASSWORD]: {
    subject: "Forgot",
    template: "forgot-password",
  },
};

export { transport, options, emailType };
