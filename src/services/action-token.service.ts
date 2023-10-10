import { FilterQuery } from "mongoose";

import { ActionToken } from "../models";
import { IActionToken } from "../types";

class ActionTokenService {
  public async create(dto: IActionToken): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }
  public async deleteManyById(userId: string): Promise<void> {
    await ActionToken.deleteMany({ _userId: userId });
  }
  public async findOne(dto: FilterQuery<IActionToken>): Promise<IActionToken> {
    return await ActionToken.findOne(dto);
  }
}

const actionTokenService = new ActionTokenService();

export { actionTokenService };
