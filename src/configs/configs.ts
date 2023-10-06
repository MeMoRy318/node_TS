import { config } from "dotenv";

config();

const configs = {
  PORT: 5000,
  BCRYPT_SALT: 10,

  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/",

  SYCRET_ACCESS: process.env.SYCRET_ACCESS,
  SYCRET_REFRESH: process.env.SYCRET_REFRESH,

  EMAIL: process.env.NO_REPLY_EMAIL || "example@gmail.com",
  PASSWORD: process.env.NO_REPLY_PASSWORD || "1111111111",
};

export { configs };
