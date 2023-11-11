import { Document, Types } from "mongoose";

import { ECarStatus } from "../enums";
import { IUser } from "./user.interface";

interface ICar extends Document {
  _userId?: Types.ObjectId | string | IUser;
  status: ECarStatus;
  model: string;
  year: number;
  producer: string;
  price: number;
}

export type { ICar };
