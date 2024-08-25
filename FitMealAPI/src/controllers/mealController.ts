import { FastifyInstance } from "fastify";


export async function mealRoutes(app: FastifyInstance) {
    app.get('/', async (req, reply) => {
        const meal = 'index 01'
    
        return reply.send({'meals route': meal})
    })
}