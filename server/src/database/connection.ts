//DATABASE CONNECTION FILE

import 'reflect-metadata';
import { Sequelize } from "sequelize-typescript"
import { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT } from "../config/env"
import { User } from './models/userModel';
import { config } from 'dotenv'
config();

const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    // logging: false //Production - off
});

sequelize.addModels([User]);

// console.log("✅ step 12: DB authentication started")
sequelize.authenticate()
    .then(() => {
        console.log("authentication complete")
    }).catch((error) => {
        console.log("authentication failed", error.message)
    });

// console.log("✅ step 13: DB MIGRATION")
sequelize.sync({ alter: false })
    .then(() => {
        console.log("database migration complete")
    }).catch((error) => {
        console.error("database migration failed", error.message)
    });

export default sequelize;