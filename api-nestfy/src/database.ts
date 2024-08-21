import knex, { Knex } from "knex";
import { env } from "./env";

export const config: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: `./database/migrations`,
    }
}

export const database = knex(config)