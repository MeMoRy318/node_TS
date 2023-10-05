import { Document } from "mongoose";

interface IUser extends Document {
  name?: string;
  email: string;
  age?: number;
  password: string;
  gender?: string;
}

type IUserCredential = Pick<IUser, "password" | "email">;

export type { IUser, IUserCredential };
