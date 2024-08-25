import fastify from "fastify";
import { TransactionsRoutes } from 'routes'

export const app = fastify()

app.register(TransactionsRoutes)