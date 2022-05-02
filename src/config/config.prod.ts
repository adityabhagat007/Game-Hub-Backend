import dotenv from "dotenv";
// import path from "node:path";
import ConfigData from "../types/configData";

dotenv.config();

const configProd: ConfigData = {
  HOST: process.env.PROD_HOST,
  PORT: process.env.PROD_PORT,
  Dialect: "postgres",
  EMAIL: process.env.PROD_EMAIL,
  PASSWORD: process.env.PROD_PASSWORD,
  DB_NAME: process.env.PROD_DB_NAME || "",
  DB_USER: process.env.PROD_DB_USER || "",
  DB_PORT: process.env.PROD_DB_PORT || "",
  DB_HOST: process.env.PROD_DB_HOST || "",
  DB_URL: process.env.PROD_DB_URL || "",
  DB_PASSWORD: process.env.PROD_DB_PASSWORD || "",
  DB_DRIVER: process.env.PROD_DB_DRIVER || "",
};

export default configProd;
