import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";

import { EFileType } from "../enums";
import { ICar, IPaginationResponse, IQuery, IUser } from "../interfaces";
import { carRepository, userRepository } from "../repositories";
import { s3Service } from "./s3.service";

class CarService {
  public async create(data: ICar, user: IUser): Promise<ICar> {
    if (user.status === "buyer") {
      await userRepository.update({ status: "seller" }, String(user._id));
    }

    return await carRepository.create(data, String(user._id));
  }

  public async getAll(query: IQuery): Promise<IPaginationResponse<ICar>> {
    return await carRepository.getAll(query);
  }

  public async delete(carId: string): Promise<boolean> {
    return await carRepository.delete(carId);
  }

  public async update(data: FilterQuery<ICar>, carId: string): Promise<ICar> {
    return await carRepository.update(data, carId);
  }
  public async updatePhoto(data: ICar, file: UploadedFile): Promise<ICar> {
    if (data.photo) {
      await s3Service.deleteFile(data.photo);
    }
    const fileKey = await s3Service.uploadFile(file, data._id, EFileType.CARS);

    return await carRepository.update({ photo: fileKey }, data._id);
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
