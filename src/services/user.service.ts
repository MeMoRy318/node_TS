import { UploadedFile } from "express-fileupload";
import { FilterQuery } from "mongoose";

import { EFileType } from "../enums";
import { IPaginationResponse, IQuery, IUser } from "../interfaces";
import { userRepository } from "../repositories";
import { s3Service } from "./s3.service";

class UserService {
  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    return await userRepository.getAll(query);
  }

  public async updateUser(dto: Partial<IUser>, userId: string): Promise<IUser> {
    return await userRepository.updateOneById(userId, dto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await userRepository.deleteUser(userId);
  }

  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  public async createUser(dto: IUser): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await userRepository.getOneByParams(params);
  }
  public async updateAvatar(
    file: UploadedFile,
    userId: string,
  ): Promise<IUser> {
    const fileKey = await s3Service.uploadFile(file, userId, EFileType.USERS);
    return await userRepository.updateOneById(userId, { avatar: fileKey });
  }
}

const userService = new UserService();

export { userService };
