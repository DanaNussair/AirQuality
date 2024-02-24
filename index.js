import { Sequelize } from "sequelize";
import 'dotenv/config'

const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASSWORD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

async function connectToPostgres() {
    const db = new Sequelize(db_name, db_user, db_password, {
        dialect: 'postgres',
        host: db_host,
        port: db_port,
        logging: true
    })    
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }    
}


connectToPostgres()