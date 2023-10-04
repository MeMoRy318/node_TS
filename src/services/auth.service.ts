import { ITokenPair, ITokenPayload, IUserCredentials } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUserCredentials): Promise<IUserCredentials> {
    const password = await passwordService.hash(dto.password);
    return { email: dto.email, password };
  }
  public login(payload: ITokenPayload): ITokenPair {
    return tokenService.generateTokenPair(payload);
  }
}

const authService = new AuthService();

export { authService };
