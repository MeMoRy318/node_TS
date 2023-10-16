import { NextFunction, Request, Response } from "express";

import { ISetNewPassword, ITokenPayload, IUser } from "../interfaces";
import { authService } from "../services";

class AuthController {
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
      const { _id: userId } = req.res.locals.user as IUser;
      const { refreshToken, accessToken } = await authService.login(userId);
      res.status(201).json({ data: { accessToken, refreshToken } });
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
      const { _userId } = req.res.locals.tokenPayload as ITokenPayload;
      const refresh = req.res.locals.refreshToken as string;

      const { refreshToken, accessToken } = await authService.refresh(
        String(_userId),
        refresh,
      );

      res.status(201).json({ data: { refreshToken, accessToken } });
    } catch (e) {
      next(e);
    }
  }
  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const accessToken = req.res.locals.accessToken as string;

      await authService.logout(accessToken);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      const { _userId } = req.res.locals.tokenPayload as ITokenPayload;

      await authService.logoutAll(String(_userId));

      return res.sendStatus(204);
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
      const { _userId } = req.res.locals.payload as ITokenPayload;
      const user = await authService.activate(String(_userId));
      res.status(200).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
  public async forgot(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = req.res.locals as IUser;
      await authService.forgot(user);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const payload = req.res.locals.payload as ITokenPayload;
      const { password } = req.body as { password: string };
      await authService.forgotPassword(payload, password);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
  public async setNewPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { newPassword } = req.body as ISetNewPassword;
      const { _userId } = req.res.locals.tokenPayload as ITokenPayload;

      await authService.setNewPassword(newPassword, String(_userId));

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthController();

export { authController };
