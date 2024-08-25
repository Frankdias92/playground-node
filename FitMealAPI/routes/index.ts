import { FastifyInstance } from "fastify";


export async function TransactionsRoutes(app: FastifyInstance) {
    app.get('/', async (req, reply) => {
        return reply.send('Welcome to app daily')
    })
}