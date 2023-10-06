import path from "path";

import { configs } from "../configs";
import { EEmailAction } from "../enums";

const emailTemplate = {
  [EEmailAction.REGISTER]: {
    subject: "Register",
    template: "register",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    subject: "forgot.",
    template: "forgot-password.",
  },
};

const transport = {
  from: "no reply",
  service: "gmail",
  auth: {
    user: configs.EMAIL,
    pass: configs.PASSWORD,
  },
};

const options = {
  viewEngine: {
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "email-templates", "layouts"),
    partialsDir: path.join(process.cwd(), "src", "email-templates", "partials"),
  },
  extName: ".hbs",
  viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
};

export { transport, options, emailTemplate };
