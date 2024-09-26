import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaGymsRepository()
  const useCase = new GetUserProfileUseCase(checkInsRepository)

  return useCase
}
