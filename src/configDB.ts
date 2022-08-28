import dotenv from 'dotenv'
import mysql from 'mysql';


dotenv.config()

export const database={
    host: process.env.SERVER,
    port:process.env.PORT_DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}

console.log(database)



