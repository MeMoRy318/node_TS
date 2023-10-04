import { FilterQuery } from "mongoose";

import { Person } from "../models";
import { IUser, IUserCredentials } from "../types";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...obj } = params;
    const [user] = await Promise.all([Person.findOne(obj)]);
    return user;
  }
  public async update(userId: string, dto: IUser): Promise<IUser> {
    const [user] = await Promise.all([
      Person.findByIdAndUpdate(userId, dto, { new: true }),
    ]);
    return user;
  }
  public async create(dto: IUser | IUserCredentials): Promise<IUser> {
    return await Person.create(dto);
  }
  public async delete(userId: string): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne({ _id: userId });
    return !!deletedCount;
  }
}

const userRepository = new UserRepository();

export { userRepository };
