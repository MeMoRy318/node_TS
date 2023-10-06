import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { carRepository } from "../repositories";

class CarMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { carId } = req.params;
      const car = await carRepository.getById(carId);
      if (!car) {
        throw new ApiError("Not found", 404);
      }
      req.res.locals = car;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByParamsAndThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const car = await carRepository.getByParams(req.body);
      if (car) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async getByParamsOrThrow(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const car = await carRepository.getByParams(req.body);
      if (!car) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      req.res.locals = car;
      next();
    } catch (e) {
      next(e);
    }
  }
}

const carMiddleware = new CarMiddleware();

export { carMiddleware };
