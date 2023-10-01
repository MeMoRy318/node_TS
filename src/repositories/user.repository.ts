import { FilterQuery } from "mongoose";

import { Person } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const [users] = await Promise.all([Person.find()]);
    return users;
  }
  public async getById(userId: string): Promise<IUser> {
    const [user] = await Promise.all([Person.findById(userId)]);
    return user;
  }
  public async getByParams(params: FilterQuery<IUser>): Promise<IUser> {
    const [user] = await Promise.all([Person.findOne(params)]);
    return user;
  }
  public async update(userId: string, dto: IUser): Promise<IUser> {
    const [user] = await Promise.all([
      Person.findByIdAndUpdate(userId, dto, { new: true }),
    ]);
    return user;
  }
  public async create(dto: IUser): Promise<IUser> {
    const [user] = await Promise.all([Person.create(dto)]);
    return user;
  }
  public async delete(userId: string): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne({ _id: userId });
    return !!deletedCount;
  }
}

const userRepository = new UserRepository();

export { userRepository };
