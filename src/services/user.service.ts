import { FilterQuery } from "mongoose";

import { Person } from "../models";
import { IUser, IUserCredential } from "../types";

class UserService {
  public async register(dto: IUserCredential): Promise<IUser> {
    return await Person.create(dto);
  }
  public async create(dto: IUser): Promise<IUser> {
    return await Person.create(dto);
  }
  public async update(dto: FilterQuery<IUser>, userId: string): Promise<IUser> {
    return await Person.findByIdAndUpdate(userId, dto, { new: true });
  }
  public async getByParams(
    params: FilterQuery<IUserCredential>,
  ): Promise<IUser> {
    return await Person.findOne({ email: params.email });
  }
  public async getAll(): Promise<IUser[]> {
    return await Person.find();
  }
  public async getById(id: string): Promise<IUser> {
    return await Person.findById(id);
  }
  public async deleteOne(params: FilterQuery<IUser>): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne(params);
    return !!deletedCount;
  }
}

const userService = new UserService();

export { userService };
