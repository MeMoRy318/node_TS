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
}

const userMiddleware = new UserMiddleware();

export { userMiddleware };
