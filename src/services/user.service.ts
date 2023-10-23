import { FilterQuery } from "mongoose";

import { IPaginationResponse, IQuery, IUser } from "../interfaces";
import { userRepository } from "../repositories";

class UserService {
  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    return await userRepository.getAll(query);
  }

  public async updateUser(dto: Partial<IUser>, userId: string): Promise<IUser> {
    return await userRepository.updateOneById(userId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  public async createUser(dto: IUser): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await userRepository.getOneByParams(params);
  }
}

const userService = new UserService();

export { userService };
