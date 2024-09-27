import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  return reply.status(200).send()
}
