import { FilterQuery } from "mongoose";

import { ICar, IPaginationResponse, IQuery } from "../interfaces";
import { carRepository } from "../repositories";

class CarService {
  public async create(data: ICar, userId: string): Promise<ICar> {
    return await carRepository.create(data, userId);
  }
  public async getAll(
    userId: string,
    query: IQuery,
  ): Promise<IPaginationResponse<ICar>> {
    const { page, limit } = query;
    const skip = +limit * (+page - 1);

    return await carRepository.getAll(userId, skip, query);
  }

  public async getById(userId: string, carId: string): Promise<ICar> {
    return await carRepository.getById(userId, carId);
  }
  public async update(
    data: FilterQuery<ICar>,
    carId: string,
    userId: string,
  ): Promise<ICar> {
    return await carRepository.update(data, userId, carId);
  }
}

const carService = new CarService();

export { carService };
