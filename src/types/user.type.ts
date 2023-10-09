import { Document } from "mongoose";

type IStatus = "active" | "inactive";
interface IUser extends Document {
  name?: string;
  email: string;
  age?: number;
  password: string;
  gender?: string;
  status?: IStatus;
}

type IUserCredential = Pick<IUser, "password" | "email">;

export type { IUser, IUserCredential, IStatus };
