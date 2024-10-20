import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorys'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { RegisterUseCase } from '@/use-cases/register'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const registerUserCase = makeRegisterUseCase()

    await registerUserCase.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
    // return reply.status(500).send()
  }

  return reply.status(201).send()
}
