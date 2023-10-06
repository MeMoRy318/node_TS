import { EEmailAction } from "../enums";

const emailTemplateConstant = {
  [EEmailAction.REGISTER]: {
    subject: "Subject",
    template: "register",
  },
  [EEmailAction.FORGOT_PASSWORD]: {
    subject: "Subject",
    template: "forgot-password",
  },
};

export { emailTemplateConstant };
