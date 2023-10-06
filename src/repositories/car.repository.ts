import { FilterQuery } from "mongoose";

import { carService } from "../services";
import { ICar } from "../types";

class CarRepository {
  public async create(dto: ICar): Promise<ICar> {
    return await carService.create(dto);
  }
  public async update(dto: ICar, userId: string): Promise<ICar> {
    return await carService.update(dto, userId);
  }
  public async getByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await carService.getByParams(params);
  }
  public async getAll(): Promise<ICar[]> {
    return await carService.getAll();
  }
  public async getById(id: string): Promise<ICar> {
    return await carService.getById(id);
  }
  public async deleteOne(params: FilterQuery<ICar>): Promise<boolean> {
    return await carService.deleteOne(params);
  }
}

const carRepository = new CarRepository();

export { carRepository };
