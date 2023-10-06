import { NextFunction, Request, Response } from "express";

import { userRepositories } from "../repositories";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = await userRepositories.getAll();
      res.status(200).json({ data: users });
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
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await userRepositories.create(req.body);
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
      const { userId } = req.params;
      const user = await userRepositories.update(req.body, userId);
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
      await userRepositories.deleteOne({ _id: userId });
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
