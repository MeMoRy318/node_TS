import { Person } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await Person.find();
    return users as IUser[];
  }

  public async getById(id: string): Promise<IUser> {
    const user = await Person.findById(id);
    return user as IUser;
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await Person.findOne({ email });
    return user as IUser;
  }

  public async delete(id: string): Promise<boolean> {
    const { deletedCount } = await Person.deleteOne({ _id: id });
    return !!deletedCount;
  }

  public async update(id: string, data: IUser): Promise<IUser> {
    const user = await Person.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    return user as IUser;
  }

  public async create(data: IUser): Promise<IUser> {
    const user = await Person.create(data);
    return user as IUser;
  }
}

const userRepository = new UserRepository();

export { userRepository };
