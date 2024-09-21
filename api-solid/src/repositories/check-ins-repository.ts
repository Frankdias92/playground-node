import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
