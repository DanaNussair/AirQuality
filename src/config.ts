import 'dotenv/config'
import { Options } from 'sequelize'

type configType = {
  [key: string]: Options
}

const config : configType = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'database',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: true
  },
  test: {
    username: "root",
    password: undefined,
    database: "database_test",
    host:  "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: undefined,
    database: "database_production",
    host:  "127.0.0.1",
    dialect: "postgres",
  }
}

export default config
