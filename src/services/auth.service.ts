import { EActionTokenType, EEmail, EToken, EUserStatus } from "../enums";
import {
  ITokenPayload,
  ITokensPair,
  IUser,
  IUserCredentials,
} from "../interfaces";
import {
  actionTokenRepository,
  tokenRepository,
  userRepository,
} from "../repositories";
import {
  emailService,
  passwordService,
  tokenService,
  userService,
} from "./index";

class AuthService {
  public async register(dto: IUserCredentials): Promise<IUser> {
    const password = await passwordService.hash(dto.password);
    const user = await userRepository.register({ ...dto, password });

    const activateToken = tokenService.generateToken(
      { _userId: user._id },
      EToken.ACTIVE,
    );

    await Promise.all([
      actionTokenRepository.create({
        token: activateToken,
        type: EActionTokenType.ACTIVE,
        _userId: user._id,
      }),
      emailService.sendEmail(dto.email, EEmail.REGISTER, { activateToken }),
    ]);

    return user;
  }

  public async login(_userId: string): Promise<ITokensPair> {
    const accessToken = tokenService.generateToken({ _userId }, EToken.ACCESS);
    const refreshToken = tokenService.generateToken(
      { _userId },
      EToken.REFRESH,
    );
    return await tokenRepository.create({ accessToken, refreshToken, _userId });
  }

  public async refresh(
    _userId: string,
    refreshToken: string,
  ): Promise<ITokensPair> {
    const access = tokenService.generateToken({ _userId }, EToken.ACCESS);
    const refresh = tokenService.generateToken({ _userId }, EToken.REFRESH);

    const [tokenPair] = await Promise.all([
      tokenRepository.create({
        accessToken: access,
        refreshToken: refresh,
        _userId,
      }),
      tokenRepository.deleteOne({ refreshToken }),
    ]);

    return tokenPair;
  }

  public async logout(accessToken: string): Promise<void> {
    await tokenRepository.deleteOne({ accessToken });
  }

  public async logoutAll(userId: string): Promise<void> {
    await tokenRepository.deleteManyByUserId(userId);
  }
  public async activate(userId: string): Promise<IUser> {
    const [user] = await Promise.all([
      await userService.updateUser({ status: EUserStatus.ACTIVE }, userId),
      actionTokenRepository.deleteManyByUserIdAndType(
        userId,
        EActionTokenType.ACTIVE,
      ),
    ]);
    return user;
  }

  public async forgot({ _id, email }: IUser): Promise<void> {
    const forgotToken = tokenService.generateToken(
      { _userId: _id },
      EToken.FORGOT,
    );
    await Promise.all([
      actionTokenRepository.create({
        token: forgotToken,
        type: EActionTokenType.FORGOT,
        _userId: _id,
      }),
      emailService.sendEmail(email, EEmail.FORGOT_PASSWORD, {
        forgotToken,
      }),
      this.logoutAll(_id),
    ]);
  }

  public async forgotPassword(
    { _userId }: ITokenPayload,
    password: string,
  ): Promise<IUser> {
    const hashedPassword = await passwordService.hash(password);
    await actionTokenRepository.deleteManyByUserIdAndType(
      String(_userId),
      EActionTokenType.FORGOT,
    );
    return await userService.updateUser(
      { password: hashedPassword },
      String(_userId),
    );
  }

  public async setNewPassword(
    newPassword: string,
    userId: string,
  ): Promise<void> {
    const password = await passwordService.hash(newPassword);
    await Promise.all([
      userRepository.updateOneById(userId, { password }),
      this.logoutAll(userId),
    ]);
  }
}

export const authService = new AuthService();
