import { Dialect, Sequelize } from "sequelize";
import config from "../config/config";

const DB_NAME = config.DB_NAME;
const DB_USER = config.DB_USER;
const DB_HOST = config.DB_HOST;
const DB_PASSWORD = config.DB_PASSWORD;
const DB_DIALECT = config.Dialect as Dialect;

const sequelizeConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 300000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    // alter: true, force: true

    sequelizeConnection
      .sync({ alter: { drop: false }, force: false })
      .then(() => {
        console.log("synched with database...");
      })
      .catch((errors: any) => {
        console.log("Unable to synch..." + errors);
      });
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelizeConnection;
