import { FilterQuery } from "mongoose";

import { tokenService } from "../services";
import { IToken } from "../types";

class TokenRepository {
  public async create(dto: IToken): Promise<IToken> {
    return await tokenService.create(dto);
  }
  public async findOne(dto: FilterQuery<IToken>): Promise<IToken> {
    return await tokenService.findOne(dto);
  }
  public async deleteOne(dto: FilterQuery<IToken>): Promise<void> {
    await tokenService.delete(dto);
  }
}
const tokenRepository = new TokenRepository();

export { tokenRepository };
