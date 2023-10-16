import { Document, Types } from "mongoose";

import { EActionTokenType } from "../enums";
import { IUser } from "./user.interface";

interface IToken extends Document {
  accessToken: string;
  refreshToken: string;
  _userId: Types.ObjectId | IUser | string;
}

type ITokenPayload = Pick<IToken, "_userId">;

interface IActionToken {
  token: string;
  type: EActionTokenType;
  _userId: Types.ObjectId | IUser | string;
}

type ITokensPair = Pick<IToken, "accessToken" | "refreshToken">;

export { IToken, ITokenPayload, ITokensPair, IActionToken };
