import { Router } from "express"
import csvWriter from "../utils/csvWriter.js"

const router = Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hello tasks ;]' })
})

router.post('/', async (req, res) => {
    try {
        const { id, name } = req.body

        await csvWriter.writeRecords([{ id, name }])

        res.status(201).json({ message: 'Task saved with success' })
    } catch (error) {
        console.error('Error to save the task', error)
        res.status(500).json({ message: 'Error to save the task', error })
    }
})


export default router