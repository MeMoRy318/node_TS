import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userRepositories } from "../repositories";
import { passwordService } from "../services";
import { IUser, IUserCredential } from "../types";

class AuthMiddleware {
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
}

const authMiddleware = new AuthMiddleware();

export { authMiddleware };
