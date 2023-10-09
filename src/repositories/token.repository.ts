import { FilterQuery } from "mongoose";

import { Token } from "../models";
import { IToken } from "../types";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }
  public async findOne(dto: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(dto);
  }
  public async deleteOne(dto: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(dto);
  }
}
const tokenRepository = new TokenRepository();

export { tokenRepository };
