import { Router } from "express"
import csvWriter from "../utils/csvWriter.js"
import { readCSV } from "../utils/csvReader.js"

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
        const { id, name } = req.body

        await csvWriter.writeRecords([{ id, name }])

        res.status(201).json({ message: 'Task saved with success' })
    } catch (error) {
        console.error('Error to save the task', error)
        res.status(500).json({ message: 'Error to save the task', error })
    }
})


export default router