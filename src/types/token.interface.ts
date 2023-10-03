import { Document, Types } from "mongoose";

import { IUser } from "./user.interface";

interface ITokenPayload {
  userId: Types.ObjectId;
  name: string;
}

interface ITokenPair {
  access: string;
  refresh: string;
}

interface IToken extends Document {
  access: string;
  refresh: string;
  _userId: Types.ObjectId | IUser;
}

export type { IToken, ITokenPayload, ITokenPair };
