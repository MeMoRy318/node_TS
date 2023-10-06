import { Types } from "mongoose";

interface ITokenPayload {
  userId: Types.ObjectId;
}
interface IToken {
  _userId?: Types.ObjectId | string;
  access: string;
  refresh: string;
}

export type { ITokenPayload, IToken };
