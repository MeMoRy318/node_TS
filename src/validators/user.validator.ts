import joi from "joi";

import { regexConstant } from "../constans";
import { EGender } from "../enums";

class UserValidator {
  static age = joi.number().min(16).max(99);
  static email = joi.string().trim().regex(regexConstant.EMAIL);
  static firstName = joi.string().min(3).max(25).trim();
  static password = joi.string().trim().regex(regexConstant.PASSWORD);
  static genders = joi.valid(...Object.values(EGender));

  static create = joi.object({
    age: this.age.required(),
    email: this.email.required(),
    name: this.firstName.required(),
    genders: this.genders.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    age: this.age,
    email: this.email,
    name: this.firstName,
    genders: this.genders,
    password: this.password,
  });

  static register = joi.object({
    password: this.password.required(),
    email: this.email.required(),
  });
}

export { UserValidator };
