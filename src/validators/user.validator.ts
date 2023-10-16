import joi from "joi";

import { regexConstant } from "../constans";
import { EGenders, EUserStatus } from "../enums";

class UserValidator {
  static gender = joi.valid(...Object.values(EGenders));
  static status = joi.valid(...Object.values(EUserStatus));
  static age = joi.number().max(99).min(16);
  static password = joi.string().trim().regex(regexConstant.PASSWORD);
  static email = joi.string().trim().lowercase().regex(regexConstant.EMAIL);
  static firstName = joi.string().min(2).max(25).trim().lowercase();

  static create = joi.object({
    age: this.age.required(),
    email: this.email.required(),
    gender: this.gender.required(),
    name: this.firstName.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    age: this.age,
    email: this.email,
    gender: this.gender,
    name: this.firstName,
  });

  static registerOrLogin = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static forgotMailVerify = joi.object({
    email: this.email.required(),
  });

  static forgotPasswordVerify = joi.object({
    password: this.password.required(),
  });

  static setNewPassword = joi.object({
    newPassword: this.password.required(),
    password: this.password.required(),
  });
}

export { UserValidator };
