import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profileController } from './profile-controller'
import { registerController } from './register-controller'
import { authenticateController } from './authenticate-controller'

export async function usersRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)

  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}
