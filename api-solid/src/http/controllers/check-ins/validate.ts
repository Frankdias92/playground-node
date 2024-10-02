import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-chek-in-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function validate(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(req.params)

  const validateCehckInUseCase = makeValidateCheckInUseCase()

  await validateCehckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send
}
