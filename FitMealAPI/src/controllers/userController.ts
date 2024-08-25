import { FastifyInstance } from "fastify";
import { z } from "zod";


export async function userRoutes(app: FastifyInstance) {
    const userSchema = z.object({
        username: z.string(),
        password: z.string().min(6)
    })

    app.post('/', async (req, reply) => {
        const { username, password } = userSchema.parse(req.body)

        console.log('print data', {username, password})

        return reply.send({ message: 'User created' })
    })
}