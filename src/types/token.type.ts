import { Types } from "mongoose";

interface ITokenPayload {
  userId: string;
}
interface IToken {
  _userId?: Types.ObjectId | string;
  access: string;
  refresh: string;
}

type ITokenType = "refresh" | "access" | "forgot";

interface IActionToken {
  _userId?: Types.ObjectId | string;
  type: ITokenType;
  token: string;
}

export type { ITokenPayload, IToken, ITokenType, IActionToken };
