import { NextFunction, Request, Response } from "express";

import { tokenRepository, userRepository } from "../repositories";
import { authService } from "../services";
import { IUser } from "../types";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = await authService.register(req.body);
      const user = await userRepository.create(body);
      res.status(201).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { name, _id } = req.res.locals as IUser;
      const tokenPair = authService.login({ name, userId: _id });
      const { access, refresh } = await tokenRepository.create({
        ...tokenPair,
        _userId: _id,
      });
      res.status(201).json({ data: { access, refresh } });
    } catch (e) {
      next(e);
    }
  }
}
const authController = new AuthController();

export { authController };
