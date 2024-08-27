import { FastifyInstance } from "fastify";
import { userRoutes } from 'src/controllers/userController'
import { mealRoutes } from 'src/controllers/mealController'

export async function routes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: 'users' })
    app.register(mealRoutes, { prefix: 'meals' })
    app.get('/:slug', async(req, reply) => {
        let {slug} = req.params as any
        return reply.send({ message: `Well done buddy! ${slug}`})
    })
}