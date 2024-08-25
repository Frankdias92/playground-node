import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { database } from "src/database";
import { z } from "zod";
import bcrypt from 'bcrypt'


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

            reply.setCookie('session_id', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            })
        }
    
        const { username, email, password } = userSchema.parse(req.body)

        const userByEmail = await database('users').where({ email }).first()

        if (userByEmail) {
            return reply.status(400).send({ message: 'User already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await database('users').insert({
            id: randomUUID(),
            username,
            email,
            password: hashedPassword,
            session_id: sessionId
        })

        return reply.status(201).send({ message: 'User created' })
    })

    app.post('/login', async (req, reply) => {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = loginSchema.parse(req.body)

        const user = await database('users').where({ email }).first()

        if (!user) {
            return reply.status(400).send({ message: 'Invalid email or password' })
        }

        const isPasswordCorret = await bcrypt.compare(password, user.password)

        if (!isPasswordCorret) {
            return reply.status(400).send({ message: 'Invalid email or password' })
        }

        let sessionId = randomUUID()

        await database('users').where({ id: user.id }).update({
            session_id: sessionId
        })

        reply.setCookie('session_id', sessionId, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        }) 

        return reply.status(200).send({ message: 'Login succesfull' })
    })
}