import { EEmail } from "../enums";
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
    return await userRepositories.register({ ...dto, password });
  }
  public async login(payload: ITokenPayload): Promise<IToken> {
    const accessToken = tokenService.generateToken(payload, "access");
    const refreshToken = tokenService.generateToken(payload, "refresh");
    const { access, refresh } = await tokenRepository.create({
      access: accessToken,
      refresh: refreshToken,
      _userId: payload.userId,
    });
    return { access, refresh };
  }

  public async refresh(
    payload: ITokenPayload,
    refresh_: string,
  ): Promise<IToken> {
    const accessToken = tokenService.generateToken(payload, "access");
    const refreshToken = tokenService.generateToken(payload, "refresh");
    await tokenRepository.delete({ refresh: refresh_ });
    const { access, refresh } = await tokenRepository.create({
      access: accessToken,
      refresh: refreshToken,
      _userId: payload.userId,
    });
    return { access, refresh };
  }

  public async forgot({ _id }: IUser): Promise<void> {
    const forgotToken = tokenService.generateToken({ userId: _id }, "forgot");
    await Promise.all([
      actionTokenRepository.create({
        token: forgotToken,
        type: "forgot",
        _userId: _id,
      }),
      emailService.sendEmail("girain3181@gmail.com", EEmail.FORGOT_PASSWORD, {
        forgotToken,
      }),
    ]);
  }
  public async forgotPassword(
    { userId }: ITokenPayload,
    password: string,
  ): Promise<IUser> {
    const hashedPassword = await passwordService.hash(password);
    await actionTokenRepository.deleteManyById(userId);
    return await userRepositories.update({ password: hashedPassword }, userId);
  }
}

const authService = new AuthService();

export { authService };
