import { Router } from "express"
import csvWriter from "../utils/csvWriter.js"
import { readCSV } from "../utils/csvReader.js"
import { generateId } from '../utils/idGenerator.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await readCSV()
        res.json(data)
    } catch (error) {
        console.error("Error to reade task from CSV :[", error)
        res.status(500).json({ message: "Error to reade task from CSV :[", error })
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, is_completed = false } = req.body

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required.' })
        }

        const created_at = new Date().toISOString()
        const newTask = {
            id: generateId(),
            title,
            description,
            completed_at: is_completed ? new Date().toISOString() : null,
            created_at,
            update_at: created_at,
            is_completed
        }

        await csvWriter.writeRecords([ newTask ])

        res.status(201).json( newTask )
    } catch (error) {
        console.error('Error to save the task', error)
        res.status(500).json({ message: 'Error to save the task', error })
    }
})


export default router