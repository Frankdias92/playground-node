import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { routes } from 'src/routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(routes)