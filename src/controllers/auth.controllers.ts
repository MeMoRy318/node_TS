import { NextFunction, Request, Response } from "express";

import { authService } from "../services";
import { ITokenPayload, IUser } from "../types";

class AuthControllers {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = await authService.register(req.body);
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
      const { _id: userId } = req.res.locals as IUser;
      const tokenPair = await authService.login({ userId });
      res.status(201).json({ data: tokenPair });
    } catch (e) {
      next(e);
    }
  }
  public async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.tokenPayload as ITokenPayload;
      const refresh = req.res.locals.refreshToken;
      const tokenPair = await authService.refresh({ userId }, refresh);
      res.status(201).json({ data: tokenPair });
    } catch (e) {
      next(e);
    }
  }
  public async activate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { userId } = req.res.locals.payload as ITokenPayload;
      const user = await authService.activate(userId);
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthControllers();

export { authController };
