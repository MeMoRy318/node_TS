import { ICar } from "../interfaces";
import { Car } from "../models";

class CarRepository {
  public async create(data: ICar, _userId: string): Promise<ICar> {
    return await Car.create({ ...data, _userId });
  }

  public async getAll(): Promise<ICar[]> {
    return await Car.find();
  }

  public async delete(carId: string): Promise<boolean> {
    const { deletedCount } = await Car.deleteOne({ _id: carId });
    return !!deletedCount;
  }

  public async update(data: ICar, carId: string): Promise<ICar> {
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
}

const carRepository = new CarRepository();

export { carRepository };
