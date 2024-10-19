import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUserCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymRepository: InMemoryGymsRepository
let sud: CreateGymUserCase

describe('Register Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sud = new CreateGymUserCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sud.execute({
      title: 'New Gym Iron',
      description: null,
      phone: null,
      latitude: 2.1,
      longitude: 2.1,
    })
    await expect(gym.id).toEqual(expect.any(String))
  })
})
