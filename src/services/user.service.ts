import { FilterQuery } from "mongoose";

import { Person } from "../models";
import { IUser, IUserCredential } from "../types";

class UserService {
  public async register(dto: IUserCredential): Promise<IUser> {
    return await Person.create(dto);
  }
  public async getByParams(
    params: FilterQuery<IUserCredential>,
  ): Promise<IUser> {
    return await Person.findOne({ email: params.email });
  }
}

const userService = new UserService();

export { userService };
