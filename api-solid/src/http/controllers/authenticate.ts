import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorys'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateUserCase = new AuthenticateUseCase(userRepository)

    await authenticateUserCase.execute({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
    // return reply.status(500).send()
  }

  return reply.status(200).send()
}
