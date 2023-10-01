import { Document } from "mongoose";

interface IUser extends Document {
  age: number;
  name: string;
  email: string;
  gender: string;
  password: string;
}

export type { IUser };
