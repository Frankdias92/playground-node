import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const creatCheckInBodySchema = z.object({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(req.query)
  const { latitude, longitude } = creatCheckInBodySchema.parse(req.body)

  const creategymUseCase = makeFetchNearbyGymsUseCase()

  await creategymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
