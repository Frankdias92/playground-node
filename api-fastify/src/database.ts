import knex, { Knex } from "knex";
import { env } from "./env";

console.log('print env', env.DATABASE_URL)
export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === 'sqlite' ? {
            filename: env.DATABASE_URL
        } : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: `./database/migrations`,
    }
}

export const database = knex(config)