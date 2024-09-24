import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
}
