import { FilterQuery } from "mongoose";

import { IUser } from "../interfaces";
import { Person } from "../models";

class UserRepository {
  public async create(dto: IUser): Promise<IUser> {
    return await Person.create(dto);
  }
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await Person.findOne(params);
  }
  public async update(dto: FilterQuery<IUser>, userId: string): Promise<IUser> {
    return await Person.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async getMany(): Promise<IUser[]> {
    return await Person.find();
  }

  public async delete(userId: string): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne({ _id: userId });
    return !!deletedCount;
  }
}

const userRepository = new UserRepository();

export { userRepository };
