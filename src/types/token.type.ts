import { Types } from "mongoose";

interface ITokenPayload {
  userId: Types.ObjectId;
}
interface IToken {
  access: string;
  refresh: string;
}

export type { ITokenPayload, IToken };
