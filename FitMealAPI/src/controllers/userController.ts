import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { database } from "src/database";
import { z } from "zod";


export async function userRoutes(app: FastifyInstance) {
    app.post('/', async (req, reply) => {
        const userSchema = z.object({
            username: z.string(),
            email: z.string(),
            password: z.string().min(6)
        })

        let sessionId = req.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            })
        }
    
        const { username, email, password } = userSchema.parse(req.body)

        const userByEmail = await database('users').where({ email }).first()

        if (userByEmail) {
            return reply.status(400).send({ message: 'User already exist' })
        }

        await database('users').insert({
            id: randomUUID(),
            username,
            email,
            password,
            session_id: sessionId
        })

        return reply.status(201).send({ message: 'User created' })
    })
}