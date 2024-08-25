import { FastifyReply, FastifyRequest } from "fastify";
import { database } from "src/database";


export async function checkSessionIdExists(
    req: FastifyRequest,
    reply: FastifyReply
) {
    const sessionId = req.cookies.sessionId

    if (!sessionId) {
        return reply.status(401).send({
            error: 'Unauthorized.'
        })
    }

    const user = await database('users').where({ session_id: sessionId }).first()

    if (!user) {
        return reply.status(401).send({ error: 'Unauthorized' })
    }

    req.user = user
}