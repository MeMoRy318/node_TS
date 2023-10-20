import { FilterQuery } from "mongoose";

import { ICar, IPaginationResponse, IQuery } from "../interfaces";
import { Car } from "../models";

class CarRepository {
  public async create(data: ICar, userId: string): Promise<ICar> {
    return await Car.create({ ...data, userId });
  }

  public async getAll(
    userId: string,
    skip: number,
    query: IQuery,
  ): Promise<IPaginationResponse<ICar>> {
    const { sortedBy, limit, page, ...searchParams } = query;

    const params = {
      ...searchParams,
      userId,
    };

    const [data, itemsFound] = await Promise.all([
      Car.find(params).limit(+limit).skip(skip).sort(sortedBy),
      Car.count(params),
    ]);

    const totalPage = Math.ceil(itemsFound / +limit);

    return {
      page: +page,
      limit: +limit,
      totalPage,
      itemsFound,
      data,
    };
  }

  public async getById(userId: string, carId: string): Promise<ICar> {
    return await Car.findOne({ userId, _id: carId });
  }
  public async update(
    data: FilterQuery<ICar>,
    userId: string,
    carId: string,
  ): Promise<ICar> {
    const car = await Car.updateOne(
      { userId, _id: carId },
      { $set: data },
      { new: true },
    ).lean();
    return car as unknown as ICar;
  }
}

const carRepository = new CarRepository();

export { carRepository };
