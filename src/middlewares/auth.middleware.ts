import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import {
  actionTokenRepository,
  tokenRepository,
  userRepositories,
} from "../repositories";
import { passwordService, tokenService } from "../services";
import { ITokenType, IUser, IUserCredential } from "../types";

class AuthMiddleware {
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

      const payload = tokenService.verifyToken(accessToken, "access");

      const entity = await tokenRepository.findOne({ access: accessToken });

      if (!entity) {
        throw new ApiError("Token not valid!", 401);
      }
      req.res.locals.tokenPayload = payload;
      req.res.locals.accessToken = accessToken;
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

      const payload = tokenService.verifyToken(refreshToken, "refresh");

      const entity = await tokenRepository.findOne({ refresh: refreshToken });

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
  public async getByParamsAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userRepositories.getByParams(req.body);
      if (user) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByParamsOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userRepositories.getByParams(req.body);
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      req.res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async passwordVerification(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { password } = req.body as IUserCredential;
      const { password: hashedPassword } = req.res.locals as IUser;
      const isMatched = await passwordService.compare(password, hashedPassword);
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public checkToken(tokenType: ITokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.query[tokenType] as string;
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
