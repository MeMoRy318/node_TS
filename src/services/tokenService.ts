import { JwtPayload, sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { ApiError } from "../errors";
import { IToken, ITokenPayload, ITokenType } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): IToken {
    const access = sign(payload, configs.SYCRET_ACCESS, { expiresIn: "1d" });
    const refresh = sign(payload, configs.SYCRET_REFRESH, { expiresIn: "30d" });
    return { access, refresh };
  }
  public generateActivateToken(payload: ITokenPayload): string {
    return sign(payload, configs.SYCRET_ACTIVATE, { expiresIn: "1d" });
  }
  public verifyToken(token: string, type: ITokenType): string | JwtPayload {
    try {
      switch (type) {
        case "access":
          return verify(token, configs.SYCRET_ACCESS);
        case "refresh":
          return verify(token, configs.SYCRET_REFRESH);
        case "activate":
          return verify(token, configs.SYCRET_ACTIVATE);
        default:
          throw new ApiError("Token not valid!", 401);
      }
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }
}

const tokenService = new TokenService();

export { tokenService };
