import { sign } from "jsonwebtoken";

import { configs } from "../configs";
import { IToken, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): IToken {
    const access = sign(payload, configs.SYCRET_ACCESS, { expiresIn: "1d" });
    const refresh = sign(payload, configs.SYCRET_REFRESH, { expiresIn: "30d" });

    return { access, refresh };
  }
}

const tokenService = new TokenService();

export { tokenService };
