import { FilterQuery } from "mongoose";

import { actionTokenService } from "../services";
import { IActionToken } from "../types";

class ActionTokenRepository {
  public async create(dto: IActionToken): Promise<IActionToken> {
    return await actionTokenService.create(dto);
  }
  public async deleteManyById(userId: string): Promise<void> {
    await actionTokenService.deleteManyById(userId);
  }
  public async findOne(dto: FilterQuery<IActionToken>): Promise<IActionToken> {
    return await actionTokenService.findOne(dto);
  }
}

const actionTokenRepository = new ActionTokenRepository();

export { actionTokenRepository };
