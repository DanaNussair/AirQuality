import { Sequelize } from 'sequelize';
import config from '../../config.js';

const env = process.env.NODE_ENV || 'development';
const conf = config[env];

const  sequelize = new Sequelize(conf.database ?? '', conf.username ?? '', conf.password, conf);

export { Sequelize, sequelize };