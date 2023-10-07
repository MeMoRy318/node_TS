import { JwtPayload, sign, verify } from "jsonwebtoken";
import { FilterQuery } from "mongoose";

import { configs } from "../configs";
import { ApiError } from "../errors";
import { Token } from "../models";
import { IToken, ITokenPayload } from "../types";

type ITokenType = "refresh" | "access";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): IToken {
    const access = sign(payload, configs.SYCRET_ACCESS, { expiresIn: "1d" });
    const refresh = sign(payload, configs.SYCRET_REFRESH, { expiresIn: "30d" });
    return { access, refresh };
  }
  public verifyToken(token: string, type: ITokenType): string | JwtPayload {
    try {
      switch (type) {
        case "access":
          return verify(token, configs.SYCRET_ACCESS);
        case "refresh":
          return verify(token, configs.SYCRET_REFRESH);
        default:
          throw new ApiError("Token not valid!", 401);
      }
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public async create(dto: IToken): Promise<IToken> {
    return await Token.create(dto);
  }
  public async findOne(dto: FilterQuery<IToken>): Promise<IToken> {
    return await Token.findOne(dto);
  }
  public async delete(dto: FilterQuery<IToken>): Promise<void> {
    await Token.deleteOne(dto);
  }
  public async deleteAllById(id: string): Promise<void> {
    await Token.deleteMany({ _userId: id });
  }
}

const tokenService = new TokenService();

export { tokenService };
