import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { carRepository } from "../repositories";

class CarMiddleware {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cars = await carRepository.getAll();
      if (!cars.length) {
        throw new ApiError("No content", 204);
      }
      req.res.locals = cars;
      next();
    } catch (e) {
      next(e);
    }
  }

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
        throw new ApiError("Conflict", 409);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

const carMiddleware = new CarMiddleware();

export { carMiddleware };
