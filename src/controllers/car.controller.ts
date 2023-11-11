import { NextFunction, Request, Response } from "express";

import { ICar, IUser } from "../interfaces";
import { carPresenter } from "../presenters";
import { carService } from "../services";

class CarController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as ICar;
      const user = req.res.locals.user as IUser;

      const car = await carService.create(body, user);
      res.status(201).json({ data: await carPresenter.present(car) });
    } catch (e) {
      next(e);
    }
  }
  public async getMany(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const cars = await carService.getAll();
      res.status(201).json({ data: cars });
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
      const car = req.res.locals.car as ICar;
      res.status(200).json({ data: await carPresenter.present(car) });
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
      await carService.delete(carId);
      res.sendStatus(204);
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
      const body = req.body;

      const car = await carService.update(body, carId);
      res.status(201).json({ data: await carPresenter.present(car) });
    } catch (e) {
      next(e);
    }
  }
}

const carController = new CarController();

export { carController };
