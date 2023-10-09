import { FilterQuery } from "mongoose";

import { userService } from "../services";
import { IUser, IUserCredential } from "../types";

class UserRepository {
  public async register(dto: IUserCredential): Promise<IUser> {
    return await userService.register(dto);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await userService.create(dto);
  }
  public async update(dto: Partial<IUser>, userId: string): Promise<IUser> {
    return await userService.update(dto, userId);
  }
  public async getByParams(
    params: FilterQuery<IUserCredential>,
  ): Promise<IUser> {
    return await userService.getByParams(params);
  }
  public async getAll(): Promise<IUser[]> {
    return await userService.getAll();
  }
  public async getById(id: string): Promise<IUser> {
    return await userService.getById(id);
  }
  public async deleteOne(params: FilterQuery<IUser>): Promise<boolean> {
    return await userService.deleteOne(params);
  }
}

const userRepositories = new UserRepository();

export { userRepositories };
