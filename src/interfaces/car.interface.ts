import { Document, Types } from "mongoose";

import { IUser } from "./user.interface";

interface ICar extends Document {
  _userId?: Types.ObjectId | string | IUser;
  model: string;
  year: number;
  producer: string;
  price: number;
}

export type { ICar };
