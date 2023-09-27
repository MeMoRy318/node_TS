import { Document } from "mongoose";

export enum EGender {
  FEMALE = "female",
  MALE = "male",
}

interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  gender: EGender;
  password: string;
}

export type { IUser };
