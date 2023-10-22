import { config } from "dotenv";

config();
const configs = {
  PORT: 5000,
  DB_URL: process.env.DB_URL || "https://example.com",

  SECRET_SALT: 10,

  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS || "",
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || "",

  JWT_SECRET_FORGOT: process.env.JWT_SECRET_FORGOT || "",
  JWT_SECRET_ACTIVATE: process.env.JWT_SECRET_ACTIVATE || "",

  NODEMAILER_EMAIL: process.env.NO_REPLY_EMAIL || "example@gmail.com",
  NODEMAILER_PASSWORD: process.env.NO_REPLY_PASSWORD || "************",

  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_S3_BUKET: process.env.AWS_S3_BUKET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
};

export { configs };
