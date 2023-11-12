import { FilterQuery } from "mongoose";

import { ICar, IPaginationResponse, IQuery } from "../interfaces";
import { Car } from "../models";

class CarRepository {
  public async create(data: ICar, _userId: string): Promise<ICar> {
    return await Car.create({ ...data, _userId });
  }

  public async getAll(query: IQuery): Promise<IPaginationResponse<ICar>> {
    const { page = 1, limit = 5, sortedBy, ...searchObj } = query;
    const skip = +limit * (+page - 1);
    const [data, itemsFound] = await Promise.all([
      Car.find(searchObj).skip(+skip).limit(+limit).sort(sortedBy),
      Car.count(searchObj),
    ]);
    return { page, limit, itemsFound, data };
  }

  public async delete(carId: string): Promise<boolean> {
    const { deletedCount } = await Car.deleteOne({ _id: carId });
    return !!deletedCount;
  }

  public async update(data: FilterQuery<ICar>, carId: string): Promise<ICar> {
    return await Car.findOneAndUpdate({ _id: carId }, data, {
      returnDocument: "after",
    }).lean();
  }

  public async getById(carId: string): Promise<ICar> {
    return await Car.findById(carId).lean();
  }
  public async getByParams(carId: string, userId: string): Promise<ICar> {
    return await Car.findOne({ _id: carId, _userId: userId });
  }
  public async getCountCarById(userId: string): Promise<number> {
    return await Car.count({ _userId: userId });
  }
}

const carRepository = new CarRepository();

export { carRepository };
