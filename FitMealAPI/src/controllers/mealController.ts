import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { database } from "src/database";
import { checkSessionIdExists } from "src/middlewares/check-session-id-exist";
import { z } from "zod";


export async function mealRoutes(app: FastifyInstance) {
    app.post('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const createMealSchema = z.object({
            name: z.string(),
            description: z.string(),
            isOnDiet: z.boolean(),
            date: z.coerce.date(),
        })

        const { name, description, isOnDiet, date } = createMealSchema.parse(
            req.body,
        )

        await database('meals').insert({
            id: randomUUID(),
            name,
            description,
            is_on_diet: isOnDiet,
            date: date.getTime(),
            user_id: req.user?.id
        })
    
        return reply.status(201).send()
    })
    
    app.get('/', async (req, reply) => {
        const meal = await database('meals').where({ user_id: req.user?.id })
    
        return reply.send({'meals route': meal})
    })
}