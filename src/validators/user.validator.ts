import joi from "joi";

import { EGender } from "../types";

class UserValidator {
  static firstName = joi.string().trim().min(3).max(25);
  static age = joi.number().min(16).max(99);
  static email = joi
    .string()
    .regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    .trim();
  static genders = joi.valid(...Object.values(EGender));
  static password = joi
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/);

  static createUser = joi.object({
    age: this.age.required(),
    email: this.email.required(),
    name: this.firstName.required(),
    genders: this.genders.required(),
    password: this.password.required(),
  });

  static updateUser = joi.object({
    age: this.age,
    email: this.email,
    name: this.firstName,
    genders: this.genders,
    password: this.password,
  });
}

export { UserValidator };
