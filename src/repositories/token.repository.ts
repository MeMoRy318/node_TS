import { Token } from "../models";
import { IToken } from "../types";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }
}

const tokenRepository = new TokenRepository();

export { tokenRepository };
