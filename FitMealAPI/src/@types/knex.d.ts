import { knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            id: string
            email: string
            password: string
            username: string
            created_at: string
            session_id: string
            uptade_at: string
        },
        meals: {
            id: number
            user_id: string
            name: string
            description: string
            is_on_diet: boolean
            date: number
            created_at: string
            updated_at: string
          }
    }
}