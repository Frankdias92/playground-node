import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profileController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
