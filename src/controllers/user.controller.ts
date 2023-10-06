import { NextFunction, Request, Response } from "express";

import { EEmailAction } from "../enums";
import { userRepository } from "../repositories";
import { emailService } from "../services";

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
      await emailService.sendMail(
        "girain3181@gmail.com",
        EEmailAction.REGISTER,
        { name: "Kooks" },
      );
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
      const body = req.body;
      const { userId } = req.params;
      const user = await userRepository.update(userId, body);
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
      await userRepository.delete(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
