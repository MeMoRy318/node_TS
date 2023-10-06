import path from "path";

import { configs } from "../configs";

const nodemailerOptional = {
  from: "No reply",
  service: "gmail",
  auth: {
    user: configs.EMAIL,
    pass: configs.PASSWORD,
  },
};

const hbsOptional = {
  viewEngine: {
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(process.cwd(), "src", "email-templates", "layouts"),
    partialsDir: path.join(process.cwd(), "src", "email-templates", "partials"),
  },
  viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
  extName: ".hbs",
};

export { hbsOptional, nodemailerOptional };
