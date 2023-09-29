import { NextFunction, Request, Response } from "express";

import { EHttpStatus } from "../enums";
import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = req.res.locals;

      res.status(EHttpStatus.OK_200).json({ data: users });
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
      const user = req.res.locals;
      res.status(EHttpStatus.OK_200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      await userRepository.delete(id);
      res.sendStatus(EHttpStatus.NO_CONTENT_204);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const value = req.res.locals as IUser;
      const user = await userRepository.create(value);

      res.status(EHttpStatus.CREATED_201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const value = req.body as IUser;
      const user = await userRepository.update(id, value);

      res.status(EHttpStatus.CREATED_201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
