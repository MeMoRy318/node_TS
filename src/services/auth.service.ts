import { userRepositories } from "../repositories";
import { IToken, ITokenPayload, IUser, IUserCredential } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./tokenService";

class AuthService {
  public async register(dto: IUserCredential): Promise<IUser> {
    const password = await passwordService.hash(dto.password);
    return await userRepositories.register({ ...dto, password });
  }
  public async login(payload: ITokenPayload): Promise<IToken> {
    return tokenService.generateTokenPair(payload);
  }
}

const authService = new AuthService();

export { authService };
