import dayjs from "dayjs";
import { FilterQuery } from "mongoose";

import { EUserStatus } from "../enums";
import { IPaginationResponse, IUser, IUserCredentials } from "../interfaces";
import { Person } from "../models";

class UserRepository {
  public async getAll(
    skip: number,
    limit: number,
    page: number,
    sortedBy: string,
    searchParams: { [key: string]: string },
  ): Promise<IPaginationResponse<IUser>> {
    const [data, itemsFound] = await Promise.all([
      Person.find(searchParams).skip(skip).limit(limit).sort(sortedBy),
      Person.count(searchParams),
    ]);

    const totalPage = Math.ceil(itemsFound / limit);

    return { page, totalPage, limit, itemsFound, data };
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await Person.findOne(params);
  }

  public async deleteManyByParams(params: FilterQuery<IUser>): Promise<void> {
    await Person.deleteMany(params);
  }
  public async findById(id: string): Promise<IUser> {
    return await Person.findById(id);
  }

  public async createUser(dto: IUser): Promise<IUser> {
    return await Person.create(dto);
  }

  public async register(dto: IUserCredentials): Promise<IUser> {
    return await Person.create(dto);
  }

  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await Person.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async setStatus(userId: string, status: EUserStatus): Promise<void> {
    await Person.updateOne({ _id: userId }, { $set: { status } });
  }

  public async deleteUser(userId: string): Promise<void> {
    await Person.deleteOne({ _id: userId });
  }
  public async findWithoutActivityAfterDate(
    data: dayjs.Dayjs,
  ): Promise<IUser[]> {
    return await Person.aggregate([
      {
        $lookup: {
          from: "token",
          localField: "_id",
          foreignField: "_userId",
          as: "tokens",
        },
      },
      {
        $match: {
          tokens: {
            $not: {
              $elemMatch: {
                createdAt: { $lte: data },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
        },
      },
    ]);
  }
}

const userRepository = new UserRepository();

export { userRepository };
