import { EActionToken, EmailEnum } from "../enums";
import {
  actionTokenRepository,
  tokenRepository,
  userRepositories,
} from "../repositories";
import { IToken, ITokenPayload, IUser, IUserCredential } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./tokenService";

class AuthService {
  public async register(dto: IUserCredential): Promise<IUser> {
    const password = await passwordService.hash(dto.password);

    const user = await userRepositories.register({ ...dto, password });
    const token = tokenService.generateActivateToken({ userId: user._id });
    const { token: _token } = await actionTokenRepository.create({
      token: token,
      _userId: user._id,
      type: EActionToken.activate,
    });

    await emailService.sendEmail("girain3181@gmail.com", EmailEnum.REGISTER, {
      activateToken: _token,
    });
    return user;
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

  public async activate(userId: string): Promise<IUser> {
    const [user] = await Promise.all([
      userRepositories.update({ status: "active" }, userId),
      actionTokenRepository.deleteManyById(userId),
    ]);
    return user;
  }
}

const authService = new AuthService();

export { authService };
