import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums";
import { IQuery, IUser } from "../interfaces";
import { s3Service, userService } from "../services";

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
      const file = req.files.avatar as UploadedFile;
      const { userId } = req.params;
      const filePath = await s3Service.uploadFile(
        file,
        EFileType.USERS,
        userId,
      );
      await s3Service.deleteFile(
        "users/652fbd3c7b8b12bf3a3337f9/e3ad9a72-d73b-4dfd-badc-a55b16adf81d.jpg",
      );
      res.status(200).json(filePath);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
