import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utilis/test/create-and-authenticate-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Javascript Gym',
        description: 'some description',
        phone: '84999999999',
        latitude: 1,
        longitude: 1,
      })

    expect(response.statusCode).toEqual(201)
  })
})
