import { config } from "dotenv";

config();

const configs = {
  SALT: 10,
  PORT: 5000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/march-2023",

  SYCRET_ACCESS: process.env.SYCRET_ACCESS || "",
  SYCRET_REFRESH: process.env.SYCRET_REFRESH || "",
};

export { configs };
