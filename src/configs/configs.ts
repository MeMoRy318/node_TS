import { config } from "dotenv";

config();

const configs = {
  SALT: 10,

  PORT: process.env.PORT || 5000,

  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/march-2023",

  SYCRET_ACCESS: process.env.SYCRET_ACCESS || "",
  SYCRET_REFRESH: process.env.SYCRET_REFRESH || "",
  SYCRET_ACTIVATE: process.env.SYCRET_ACTIVATE || "",

  EMAIL: process.env.NO_REPLY_EMAIL,
  PASSWORD: process.env.NO_REPLY_PASSWORD,
};

export { configs };
