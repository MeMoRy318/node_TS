import { Document } from "mongoose";

export enum EGender {
  MALE = "male",
  FEMALE = "female",
}

interface IUser extends Document {
  password: string;
  email: string;
  genders: EGender;
  name: string;
  age: number;
}

export type { IUser };
