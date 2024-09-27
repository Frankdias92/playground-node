import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register-controller'
import { authenticate } from './controllers/authenticate'
import { profileController } from './controllers/profile-controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticate)

  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
