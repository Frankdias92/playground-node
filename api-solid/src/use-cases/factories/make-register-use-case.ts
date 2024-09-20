import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositorys'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerUserCase = new RegisterUseCase(userRepository)

  return registerUserCase
}
