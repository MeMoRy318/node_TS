import { tokenRepository, userRepositories } from "../repositories";
import { IToken, ITokenPayload, IUser, IUserCredential } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./tokenService";

class AuthService {
  public async register(dto: IUserCredential): Promise<IUser> {
    const password = await passwordService.hash(dto.password);
    return await userRepositories.register({ ...dto, password });
  }
  public async login(payload: ITokenPayload): Promise<IToken> {
    const tokenPair = tokenService.generateTokenPair(payload);
    const { access, refresh } = await tokenRepository.create({
      ...tokenPair,
      _userId: payload.userId,
    });
    return { access, refresh };
  }
  public async refresh(
    payload: ITokenPayload,
    refresh_: string,
  ): Promise<IToken> {
    const tokenPair = tokenService.generateTokenPair(payload);
    await tokenRepository.deleteOne({ refresh: refresh_ });
    const { access, refresh } = await tokenRepository.create({
      ...tokenPair,
      _userId: payload.userId,
    });
    return { access, refresh };
  }
}

const authService = new AuthService();

export { authService };
