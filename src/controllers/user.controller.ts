import { NextFunction, Request, Response } from "express";

import { IQuery, IUser } from "../interfaces";
import { userService } from "../services";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll(req.query as IQuery);

      return res.json(users);
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
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  public async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await userService.deleteUser(req.params.userId);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const body = req.body as IUser;

      const user = await userService.updateUser(body, userId);

      res.status(201).json(user);
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
      const user = await userService.createUser(req.body);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
