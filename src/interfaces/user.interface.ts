import { Document } from "mongoose";

import { EGenders, EUserStatus } from "../enums";

interface IUser extends Document {
  name: string;
  gender: EGenders;
  status: EUserStatus;
  age: number;
  email: string;
  password: string;
  avatar: null | string;
}

interface ISetNewPassword {
  newPassword: string;
  password: string;
}

type IUserCredentials = Pick<IUser, "password" | "email">;

export type { IUser, IUserCredentials, ISetNewPassword };
