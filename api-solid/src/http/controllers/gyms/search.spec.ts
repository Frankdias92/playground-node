import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utilis/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javacript Gym',
        description: 'some description',
        phone: '84999999999',
        latitude: 1,
        longitude: 1,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'some description 2',
        phone: '84999999991',
        latitude: 3,
        longitude: 3,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Javacript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Javacript Gym',
      }),
    ])
  })
})
