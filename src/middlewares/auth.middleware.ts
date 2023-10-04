import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userRepository } from "../repositories";
import { passwordService } from "../services";
import { IUser, IUserCredentials } from "../types";

class AuthMiddleware {
  public async getByEmailOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as IUserCredentials;
      const user = await userRepository.getByParams(body);
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
      const { password } = req.body as IUserCredentials;
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
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware };
