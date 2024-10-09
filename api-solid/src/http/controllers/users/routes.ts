import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profileController } from './profile-controller'
import { registerController } from './register-controller'
import { authenticateController } from './authenticate-controller'
import { refreshController } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refreshController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
