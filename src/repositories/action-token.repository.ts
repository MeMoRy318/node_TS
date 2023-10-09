import { FilterQuery } from "mongoose";

import { ActionToken } from "../models";
import { IActionToken } from "../types";

class ActionTokenRepository {
  public async create(dto: IActionToken): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }
  public async findOne(dto: FilterQuery<IActionToken>): Promise<IActionToken> {
    return await ActionToken.findOne(dto);
  }
  public async deleteManyById(userId: string): Promise<void> {
    await ActionToken.deleteMany({ _userId: userId });
  }
}

const actionTokenRepository = new ActionTokenRepository();

export { actionTokenRepository };
