import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userRepository } from "../repositories";

class UserMiddleware {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userRepository.getAll();
      if (!users.length) {
        throw new ApiError("No content", 204);
      }
      req.res.locals = users;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await userRepository.getById(userId);
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
      const user = await userRepository.getByParams(req.body);
      if (user) {
        throw new ApiError("Conflict", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

const userMiddleware = new UserMiddleware();

export { userMiddleware };
