import joi from "joi";

import { regexConstant } from "../constans";
import { EGender } from "../enums";

class UserValidator {
  static email = joi.string().trim().lowercase().regex(regexConstant.EMAIL);
  static password = joi.string().trim().regex(regexConstant.PASSWORD);
  static firstName = joi.string().trim().min(2).max(25);
  static age = joi.number().min(16).max(99);
  static gender = joi.valid(...Object.values(EGender));

  static registerOrLogin = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}

export { UserValidator };
