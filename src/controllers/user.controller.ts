import { NextFunction, Request, Response } from "express";

import { userRepository } from "../repositories";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const users = req.res.locals;
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
      const user = await userRepository.create(req.body);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
