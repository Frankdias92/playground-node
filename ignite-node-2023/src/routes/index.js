import { Router } from "express"

const routes = Router()

routes.use('/tasks', (req, res) => {
    return res.status(200).json({message: 'working'})
})


export {routes}

