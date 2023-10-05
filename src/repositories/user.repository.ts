import { FilterQuery } from "mongoose";

import { userService } from "../services";
import { IUser, IUserCredential } from "../types";

class UserRepository {
  public async register(dto: IUserCredential): Promise<IUser> {
    return await userService.register(dto);
  }
  public async getByParams(
    params: FilterQuery<IUserCredential>,
  ): Promise<IUser> {
    return await userService.getByParams(params);
  }
}

const userRepositories = new UserRepository();

export { userRepositories };
