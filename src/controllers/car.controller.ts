import { NextFunction, Request, Response } from "express";

import { ICar, IQuery, ITokenPayload } from "../interfaces";
import { carService } from "../services";

class CarController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const body = req.body as ICar;
      const { _userId } = req.res.locals.tokenPayload as ITokenPayload;
      const car = await carService.create(body, String(_userId));
      res.status(201).json({ data: car });
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { _userId } = req.res.locals.tokenPayload as ITokenPayload;
      const query = req.query as IQuery;
      const cars = await carService.getAll(String(_userId), query);
      res.status(200).json({ data: cars });
    } catch (e) {
      next(e);
    }
  }
}

const carController = new CarController();

export { carController };
