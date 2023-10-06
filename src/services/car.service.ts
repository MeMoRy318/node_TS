import { FilterQuery } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarService {
  public async create(dto: ICar): Promise<ICar> {
    return await Car.create(dto);
  }
  public async update(dto: ICar, carId: string): Promise<ICar> {
    return await Car.findByIdAndUpdate(carId, dto, { new: true });
  }
  public async getByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }
  public async getAll(): Promise<ICar[]> {
    return await Car.find();
  }
  public async getById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }
  public async deleteOne(params: FilterQuery<ICar>): Promise<boolean> {
    const { deletedCount } = await Car.deleteOne(params);
    return !!deletedCount;
  }
}

const carService = new CarService();

export { carService };
