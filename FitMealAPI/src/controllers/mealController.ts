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
            date: z.coerce.date()
        })

        const { name, description, isOnDiet, date } = createMealSchema.parse(
            req.body,
        )

        await database('meals').insert({
            name,
            description,
            is_on_diet: isOnDiet,
            date: date.getTime(),
            user_id: req.user?.id
        })
    
        return reply.status(201).send()
    })
    
    app.get('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const meal = await database('meals')
            .where({ user_id: req.user?.id })
            .orderBy("created_at", "desc")
    
        return reply.send({ meal })
    })

    app.get('/:meal_id', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const getMealId = z.object({
            meal_id: z.coerce.number()
        })
        const { meal_id } = getMealId.parse( req.params )

        if(!meal_id) {
            return reply.status(401).send({
                error: 'meal_id is required.'
            }) 
        }
        
        const meal = await database('meals')
            .where({ user_id: req.user?.id })
            .andWhere({ id: meal_id })
    
        return reply.status(200).send({ meal })
    })

    app.put('/:meal_id', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const createMealSchema = z.object({
            name: z.string(),
            description: z.string(),
            isOnDiet: z.boolean(),
            date: z.coerce.date()
        })
        const getMealId = z.object({
            meal_id: z.coerce.number()
        })

        const { name, description, isOnDiet, date } = createMealSchema.parse(
            req.body,
        )
        const { meal_id } = getMealId.parse( req.params )

        if(!meal_id) {
            return reply.status(401).send({
                error: 'meal_id is required.'
            }) 
        }

        const meal = await database('meals').where({ id: meal_id }).first()

        if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' })
        }

        await database('meals').where({ id: meal_id })
            .update({
                name,
                description,
                is_on_diet: isOnDiet,
                date: date.getTime(),
                user_id: req.user?.id
            })

        return reply.status(200).send({ message: 'Meal update' })
    })

    app.delete('/:meal_id', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const getMealId = z.object({
            meal_id: z.coerce.number()
        })

        const { meal_id } = getMealId.parse( req.params )
        if(!meal_id) {
            return reply.status(401).send({
                error: 'meal_id is required.'
            }) 
        }

        await database('meals').where({ id: meal_id }).delete()

        return reply.status(200).send({ message: 'Meal delete succefull' })
    })

    app.get('/metrics', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
        const totalMealsOnDiet = await database('meals')
            .where({ user_id: req.user?.id, is_on_diet: true })
            .count('id', { as: 'total' })
            .first()

        const totalMealsWithoutDiet = await database('meals')
            .where({ user_id: req.user?.id, is_on_diet: true })
            .count('id', { as: 'total' })
            .first()

        const totalMeals = await database('meals')
            .where({ user_id: req.user?.id })
            .orderBy('date', 'desc')
        
        const { boostDaysOnDiet } = totalMeals.reduce((acc, meal) => {
            if (meal.is_on_diet) {
                acc.currentSequence += 1
            } else {
                acc.currentSequence = 0
            }

            if (acc.currentSequence > acc.boostDaysOnDiet) {
                acc.boostDaysOnDiet = acc.currentSequence
            }
            return acc
        },  { boostDaysOnDiet: 0, currentSequence: 0}  )

        return reply.send({
            totalMeals: totalMeals.length,
            totalMealsOnDiet: totalMealsOnDiet?.total,
            totalMealsWithoutDiet: totalMealsWithoutDiet?.total,
            boostDaysOnDiet
        })
            
    })
}