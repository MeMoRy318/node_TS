import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces";
import { authService, userService } from "../services";

class UserController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(req.body as IUser);
      res.status(201).json({ data: user });
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
      const user = req.res.locals.user;
      res.status(201).json({ data: user });
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
      const body = req.body as IUser;
      const { userId } = req.params;
      const user = await userService.update(body, userId);
      res.status(201).json({ data: user });
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
      const { userId } = req.params;
      await userService.delete(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async getMany(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userService.getMany();
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
