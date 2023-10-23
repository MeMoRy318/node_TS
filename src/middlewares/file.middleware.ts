import { NextFunction, Request, Response } from "express";

import { fileConfig } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public async uploadFile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError(
          "Avatar is not allowed to be an array of images",
          400,
        );
      }
      const { size, mimetype } = req.files.avatar;

      if (size > fileConfig.SIZE) {
        throw new ApiError("File is to big", 400);
      }

      if (!fileConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError("File has invalid format", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

const fileMiddleware = new FileMiddleware();

export { fileMiddleware };
