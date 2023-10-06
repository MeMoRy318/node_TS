import { NextFunction, Request, Response } from "express";

import { carRepository } from "../repositories";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cars = await carRepository.getAll();
      res.status(200).json({ data: cars });
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
      const car = req.res.locals;
      res.status(200).json({ data: car });
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
      const car = await carRepository.create(req.body);
      res.status(201).json({ data: car });
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
      const { carId } = req.params;
      const car = await carRepository.update(req.body, carId);
      res.status(201).json({ data: car });
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
      const { carId } = req.params;
      await carRepository.deleteOne({ _id: carId });
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

const carController = new CarController();

export { carController };
