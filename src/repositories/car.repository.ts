import { FilterQuery } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getAll(): Promise<ICar[]> {
    const [cars] = await Promise.all([Car.find()]);
    return cars;
  }
  public async getById(userId: string): Promise<ICar> {
    const [car] = await Promise.all([Car.findById(userId)]);
    return car;
  }
  public async getByParams(params: FilterQuery<ICar>): Promise<ICar> {
    const [car] = await Promise.all([Car.findOne(params)]);
    return car;
  }
  public async update(carId: string, dto: ICar): Promise<ICar> {
    const [car] = await Promise.all([
      Car.findByIdAndUpdate(carId, dto, { new: true }),
    ]);
    return car;
  }
  public async create(dto: ICar): Promise<ICar> {
    const [car] = await Promise.all([Car.create(dto)]);
    return car;
  }
  public async delete(carId: string): Promise<boolean> {
    const { deletedCount } = await Car.deleteOne({ _id: carId });
    return !!deletedCount;
  }
}

const carRepository = new CarRepository();

export { carRepository };
