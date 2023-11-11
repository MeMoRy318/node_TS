import { ICar, IUser } from "../interfaces";
import { carRepository, userRepository } from "../repositories";

class CarService {
  public async create(data: ICar, user: IUser): Promise<ICar> {
    if (user.status === "buyer") {
      await userRepository.update({ status: "seller" }, String(user._id));
    }

    return await carRepository.create(data, String(user._id));
  }

  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async delete(carId: string): Promise<boolean> {
    return await carRepository.delete(carId);
  }

  public async update(data: ICar, carId: string): Promise<ICar> {
    return await carRepository.update(data, carId);
  }

  public async getById(carId: string): Promise<ICar> {
    return await carRepository.getById(carId);
  }
  public async getByParams(carId: string, userId: string): Promise<ICar> {
    return await carRepository.getByParams(carId, userId);
  }

  public async getCountCarById(userId: string): Promise<number> {
    return await carRepository.getCountCarById(userId);
  }
}

const carService = new CarService();

export { carService };
