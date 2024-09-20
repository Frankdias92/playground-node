import type { FastifyInstance } from 'fastify'
import { registerController } from './controllers/register-controller'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticate)
}
