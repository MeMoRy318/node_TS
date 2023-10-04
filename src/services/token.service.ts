import { sign, verify } from "jsonwebtoken";

import { configs } from "../configs";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const access = sign(payload, configs.SYCRET_ACCESS, { expiresIn: "1d" });
    const refresh = sign(payload, configs.SYCRET_REFRESH, { expiresIn: "30d" });
    return { access, refresh };
  }

  public checkAccessToken(access: string): ITokenPayload {
    return <ITokenPayload>verify(access, configs.SYCRET_ACCESS);
  }
  public checkRefreshToken(refresh: string): ITokenPayload {
    return <ITokenPayload>verify(refresh, configs.SYCRET_REFRESH);
  }
}

const tokenService = new TokenService();

export { tokenService };
