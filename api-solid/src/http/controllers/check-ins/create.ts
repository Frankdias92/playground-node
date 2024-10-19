import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const creatCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = creatCheckInBodySchema.parse(req.body)

  const creategymUseCase = makeCheckInUseCase()

  await creategymUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
