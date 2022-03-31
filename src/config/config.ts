import dotenv from "dotenv";
import path from "node:path";
import ConfigData from "../types/configData.js";
import configDev from "./config.dev";
import configProd from "./config.prod";


dotenv.config({
  path: path.join(__dirname, `config.${process.env.NODE_ENV?.trim()}.env`),
});
// console.log(
//    "ENV file path --> ",
//    path.join(__dirname, `config.${process.env.NODE_ENV.trim()}.env`)
// );


let config;

if (process.env.NODE_ENV?.trim() === "dev") {
  config = { ...configDev ,NODE_ENV: process.env.NODE_ENV?.trim()};
} else if (process.env.NODE_ENV?.trim() === "prod") {
  config = { ...configProd , NODE_ENV: process.env.NODE_ENV?.trim()};
}
// console.log(config);

export default config as ConfigData;
