import { config } from "dotenv";

config();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
export { DB_URL, PORT };
