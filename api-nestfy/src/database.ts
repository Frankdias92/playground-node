import 'dotenv/config'
import knex, { Knex } from "knex";

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: `${process.env.SQLITE_FILENAME}/app.db`
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: `${process.env.SQLITE_FILENAME}/migrations`,
    }
}

export const database = knex(config)