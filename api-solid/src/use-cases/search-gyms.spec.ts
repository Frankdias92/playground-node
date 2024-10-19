import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'
import { beforeEach, describe, expect, it } from 'vitest'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym Name Find Me',
      description: null,
      phone: null,
      latitude: 1,
      longitude: 1,
    })

    await gymsRepository.create({
      title: 'gym Name Another Name',
      description: null,
      phone: null,
      latitude: 1,
      longitude: 1,
    })

    const { gyms } = await sut.execute({
      query: 'Find Me',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym Name Find Me' }),
    ])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym Name Find Me ${i}`,
        description: null,
        phone: null,
        latitude: 1,
        longitude: 1,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Find Me',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'gym Name Find Me 21' }),
      expect.objectContaining({ title: 'gym Name Find Me 22' }),
    ])
  })
})
