import { NextFunction, Request, Response } from "express";

import { EHttpStatus } from "../enums";
import { ApiError } from "../errors";
import { userRepository } from "../repositories";
import { IUser } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userRepository.getAll();
      if (!users.length) {
        throw new ApiError("No content", EHttpStatus.NO_CONTENT_204);
      }
      req.res.locals = users;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userRepository.getById(id);
      if (!user) {
        throw new ApiError("Not found", EHttpStatus.NOT_FOUND_404);
      }
      req.res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isBodyValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body;
      const { value, error } = UserValidator.create.validate(body);

      if (error) {
        throw new ApiError("Person not Valid", EHttpStatus.BAD_REQUEST_400);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async findByEmailAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { email } = req.res.locals as IUser;
      const user = await userRepository.getByEmail(email);
      if (user) {
        throw new ApiError("Conflict", EHttpStatus.CONFLICT_409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
