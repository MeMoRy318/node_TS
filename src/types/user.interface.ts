import { Document } from "mongoose";

interface IUser extends Document {
  age: number;
  name: string;
  email: string;
  genders: string;
  password: string;
}

export type { IUser };
