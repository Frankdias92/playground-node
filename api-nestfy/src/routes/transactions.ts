import { FastifyInstance } from "fastify"
import { database } from "../database"
import { z } from "zod"
import { randomUUID } from 'node:crypto'


export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async (req, reply) => {
        const transactions = await database('transactions').select()

        return { transactions }
    })

    app.get('/:id', async (req, reply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(req.params)

        const transaction = await database('transactions').where('id', id).first()

        return { transaction }
    })

    app.get('/summary', async (req, reply) => {
        const summary = await database('transactions')
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })
    
    app.post('/', async (req, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum([ 'credit', 'debit' ])
        })

        const { amount, title, type } = createTransactionBodySchema.parse(req.body)

        let sessionId = req.cookies.session_id
        if (!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 Days
            })
        }
        
        await database('transactions')
            .insert({
                id: randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId
            })
        
        return reply.status(201).send()
    })
}