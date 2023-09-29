import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { EHttpStatus } from "../enums";
import { ApiError } from "../errors";

class CommonMiddleware {
  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const isIdValid = isObjectIdOrHexString(id);

      if (!isIdValid) {
        throw new ApiError("ID not valid", EHttpStatus.BAD_REQUEST_400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

const commonMiddleware = new CommonMiddleware();

export { commonMiddleware };
