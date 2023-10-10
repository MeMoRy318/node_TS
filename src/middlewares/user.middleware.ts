import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userRepositories } from "../repositories";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userRepositories.getById(userId);
      if (!user) {
        throw new ApiError("Not found", 404);
      }
      req.res.locals = user;
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
}

const userMiddleware = new UserMiddleware();

export { userMiddleware };
