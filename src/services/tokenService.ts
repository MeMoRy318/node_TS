import { JwtPayload, sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { ApiError } from "../errors";
import { ITokenPayload, ITokenType } from "../types";

class TokenService {
  public generateToken(payload: ITokenPayload, type: ITokenType): string {
    try {
      switch (type) {
        case "forgot":
          return sign(payload, configs.SYCRET_FORGOT, { expiresIn: "1d" });
        case "access":
          return sign(payload, configs.SYCRET_ACCESS, { expiresIn: "1d" });
        case "refresh":
          return sign(payload, configs.SYCRET_REFRESH, { expiresIn: "30d" });
        default:
          throw new ApiError("Token not valid!", 401);
      }
    } catch (e) {
      throw new ApiError("Token not valid!", 401);
    }
  }

  public verifyToken(token: string, type: ITokenType): string | JwtPayload {
    try {
      switch (type) {
        case "access":
          return verify(token, configs.SYCRET_ACCESS);
        case "refresh":
          return verify(token, configs.SYCRET_REFRESH);
        case "forgot":
          return verify(token, configs.SYCRET_FORGOT);
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
