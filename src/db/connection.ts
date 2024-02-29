import { Sequelize } from "sequelize";
import config from "../config/config.js";

const env = process.env.NODE_ENV || "development";
const conf = config[env];

const sequelize = new Sequelize(conf);

export { Sequelize, sequelize };
