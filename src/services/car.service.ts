import { ICar } from "../interfaces";
import { carRepository } from "../repositories";

class CarService {
  public async create(data: ICar, userId: string): Promise<ICar> {
    return await carRepository.create(data, userId);
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
}

const carService = new CarService();

export { carService };
