import { FastifyInstance } from "fastify"
import { database } from "../database"
import { z } from "zod"
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from "../middlewares/check-session-id-exist"


export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const { sessionId } = req.cookies
        
        const transactions = await database('transactions')
            .where('session_id', sessionId)
            .select()

        return { transactions }
    })

    app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionParamsSchema.parse(req.params)
        const { sessionId } = req.cookies

        const transaction = await database('transactions')
            .where({
                session_id: sessionId,
                id
            })
            .first()

        return { transaction }
    })

    app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const { sessionId } = req.cookies
        
        const summary = await database('transactions')
            .where({session_id: sessionId})
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })
    
    app.post('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum([ 'credit', 'debit' ])
        })

        const { amount, title, type } = createTransactionBodySchema.parse(req.body)
        let { sessionId } = req.cookies

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