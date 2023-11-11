import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services";

class UserMiddleware {
  public getByParamsAndThrow<T>(params: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const value = req.body[params];
        const user = await userService.getOneByParams({ [params]: value });
        if (user) {
          throw new ApiError("Invalid credentials provided", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public getByParamsOrThrow<T>(params: keyof T) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const value = req.body[params];
        const user = await userService.getOneByParams({ [params]: value });
        if (!user) {
          throw new ApiError("Invalid credentials provided", 401);
        }
        req.res.locals.user = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userService.getOneByParams({ _id: userId });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      req.res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

const userMiddleware = new UserMiddleware();

export { userMiddleware };
