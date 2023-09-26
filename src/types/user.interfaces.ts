import { Document } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: EGender;
}
export enum EGender {
  MALE = "male",
  FEMALE = "female",
}

export type { IUser };
