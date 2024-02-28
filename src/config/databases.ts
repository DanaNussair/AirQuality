import { Options } from 'sequelize';

import 'dotenv/config'

type ConfigType = {
    [key: string]: Options
}

const config: ConfigType = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: console.log
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    port: Number(process.env.TEST_DB_PORT),
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host:  "127.0.0.1",
    dialect: "postgres",
    logging: false
  }
}

export default config
