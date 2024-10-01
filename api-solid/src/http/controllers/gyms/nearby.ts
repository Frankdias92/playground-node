import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function nearby(req: FastifyRequest, reply: FastifyReply) {
  const creatCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = creatCheckInParamsSchema.parse(req.params)
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(req.query)

  const checkInUseCase = makeCheckInUseCase()

  const { checkIn } = await checkInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    checkIn,
  })
}
