import 'dotenv/config'
import knex from "knex";


export const database = knex({
    client: 'sqlite3',
    connection: {
        filename: process.env.SQLITE_FILENAME as string
    },
    useNullAsDefault: true
})