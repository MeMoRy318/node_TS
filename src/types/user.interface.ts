import { Document } from "mongoose";

interface IUser extends Document {
  age: number;
  name: string;
  email: string;
  genders: string;
  password: string;
}

type IUserCredentials = Pick<IUser, "password" | "email">;

export type { IUser, IUserCredentials };
