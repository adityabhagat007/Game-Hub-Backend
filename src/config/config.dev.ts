import dotenv from "dotenv";

import ConfigData from "../types/configData";

dotenv.config();

const configDev: ConfigData = {
  HOST: process.env.DEV_HOST,
  PORT: process.env.DEV_PORT,
  Dialect: "postgres",
  DB_NAME: process.env.DEV_DB_NAME || "",
  DB_USER: process.env.DEV_DB_USER || "",
  DB_PORT: process.env.DEV_DB_PORT || "",
  DB_HOST: process.env.DEV_DB_HOST || "",
  DB_URL: process.env.DEV_DB_URL || "",
  DB_PASSWORD: process.env.DEV_DB_PASSWORD || "",
  DB_DRIVER: process.env.DEV_DB_DRIVER || "",
};

export default configDev;
