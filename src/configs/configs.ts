import { config } from "dotenv";

config();
const configs = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/",
};

export { configs };