import { FilterQuery } from "mongoose";

import { userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }
  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async getByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await userRepository.getByParams(params);
  }
  public async update(userId: string, dto: IUser): Promise<IUser> {
    return await userRepository.update(userId, dto);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async delete(userId: string): Promise<boolean> {
    return await userRepository.delete(userId);
  }
}

const userService = new UserService();

export { userService };
