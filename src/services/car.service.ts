import { FilterQuery } from "mongoose";

import { carRepository } from "../repositories";
import { ICar } from "../types";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }
  public async getById(carId: string): Promise<ICar> {
    return await carRepository.getById(carId);
  }

  public async getByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await carRepository.getByParams(params);
  }
  public async update(carId: string, dto: ICar): Promise<ICar> {
    return await carRepository.update(carId, dto);
  }
  public async create(dto: ICar): Promise<ICar> {
    return await carRepository.create(dto);
  }
  public async delete(carId: string): Promise<boolean> {
    return await carRepository.delete(carId);
  }
}

const carService = new CarService();

export { carService };
