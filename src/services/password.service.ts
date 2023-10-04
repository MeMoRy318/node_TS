import { compare, hash } from "bcrypt";

import { configs } from "../configs";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return await hash(password, configs.BCRYPT_SALT);
  }
  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}

const passwordService = new PasswordService();

export { passwordService };
