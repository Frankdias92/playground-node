import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user?: {
      id: string
      email: string
      password: string
      username: string
      created_at: string
      session_id: string
      uptade_at: string
    }
  }
}