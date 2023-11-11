import { Types } from "mongoose";

import { EUserStatus } from "../enums";

interface IUser {
  _id?: Types.ObjectId | IUser | string;
  name: string;
  phone: string;
  status: EUserStatus;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type { IUser };
