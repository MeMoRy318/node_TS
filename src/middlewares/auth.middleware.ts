import { NextFunction, Request, Response } from "express";

import { EToken } from "../enums";
import { ApiError } from "../errors";
import { ITokenPayload, IUser } from "../interfaces";
import { actionTokenRepository, tokenRepository } from "../repositories";
import { passwordService, tokenService, userService } from "../services";

class AuthMiddleware {
  public async passwordVerification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const password = req.body.password as string;
      const { password: hashedPassword } = req.res.locals.user as IUser;
      const isMatched = await passwordService.compare(password, hashedPassword);
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.verifyToken(
        accessToken,
        EToken.ACCESS,
      ) as ITokenPayload;

      const [entity, user] = await Promise.all([
        tokenRepository.findOne({ accessToken }),
        userService.getMe(String(payload._userId)),
      ]);

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }
      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No Token!", 401);
      }

      const payload = tokenService.verifyToken(refreshToken, EToken.REFRESH);

      const entity = await tokenRepository.findOne({ refreshToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }
      req.res.locals.tokenPayload = payload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkActionToken(tokenType: EToken) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.params[tokenType] as string;

        if (!token) {
          throw new ApiError("No Token!", 401);
        }
        const payload = tokenService.verifyToken(token, tokenType);

        const entity = await actionTokenRepository.findOne({ token });

        if (!entity) {
          throw new ApiError("Token not valid!", 401);
        }
        req.res.locals.payload = payload;
        req.res.locals[tokenType] = token;

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware };
