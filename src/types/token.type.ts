import { Types } from "mongoose";

import { EActionToken } from "../enums";
import { IUser } from "./user.type";

interface ITokenPayload {
  userId: string;
}
interface IToken {
  _userId?: Types.ObjectId | string;
  access: string;
  refresh: string;
}
interface IActionToken {
  token: string;
  type: EActionToken;
  _userId: Types.ObjectId | IUser | string;
}

type ITokenType = "refresh" | "access" | "activate";

export type { ITokenPayload, IToken, ITokenType, IActionToken };
