import path from "path";

import { configs } from "../configs";
import { EmailEnum } from "../enums";

const emailTransport = {
  from: "No reply",
  service: "gmail",
  auth: {
    user: configs.EMAIL,
    pass: configs.PASSWORD,
  },
};
const hbsOptions = {
  viewEngine: {
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "email-templates", "layouts"),
    partialsDir: path.join(process.cwd(), "src", "email-templates", "partials"),
  },
  viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
  extName: ".hbs",
};

const templates = {
  [EmailEnum.REGISTER]: {
    subject: "Register",
    template: "register",
  },
  [EmailEnum.FORGOT_PASSWORD]: {
    subject: "Forgot",
    template: "",
  },
};

export { emailTransport, hbsOptions, templates };
