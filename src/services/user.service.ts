import { FilterQuery } from "mongoose";

import { IUser } from "../interfaces";
import { userRepository } from "../repositories";

class UserService {
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await userRepository.getOneByParams(params);
  }
  public async getMany(): Promise<IUser[]> {
    return await userRepository.getMany();
  }
  public async getOneById(userId: string): Promise<IUser> {
    return await userRepository.getOneByParams({ _id: userId });
  }
  public async create(dto: IUser): Promise<IUser> {
    return await userRepository.create(dto);
  }
  public async update(dto: IUser, userId: string): Promise<IUser> {
    return await userRepository.update(dto, userId);
  }
  public async delete(userId: string): Promise<boolean> {
    return await userRepository.delete(userId);
  }
}

const userService = new UserService();

export { userService };
