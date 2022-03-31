import dotenv from "dotenv";
import path from "node:path";
import ConfigData from "../types/configData";

dotenv.config({
  path: path.join(__dirname, `config.${process.env.NODE_ENV?.trim()}.env`),
});

const configDev: ConfigData = {
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  Dialect: "postgres",
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PORT: process.env.DB_PORT || "",
  DB_HOST: process.env.DB_HOST || "",
  DB_URL: process.env.DB_URL || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DRIVER: process.env.DB_DRIVER || "",
};

export default configDev;
