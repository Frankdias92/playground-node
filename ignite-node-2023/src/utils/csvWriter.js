import fs from 'fs'
import path from 'path'
import { createObjectCsvWriter } from 'csv-writer' 

const filePath = path.resolve('tasks.csv')

const fileExists = fs.existsSync(filePath)

const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
        { id: 'id', title: 'ID' },
        { id: 'title', title: 'Title' },
        { id: 'description', title: 'Description' },
        { id: 'completed_at', title: 'CompletedAt' },
        { id: 'created_at', title: 'CreatedAt' },
        { id: 'updated_at', title: 'UpdatedAt' },
        { id: 'is_completed', title: 'IsCompleted' }
    ],
    append: true,
})

if (!fileExists) {
    csvWriter.writeRecords([])
}

export default csvWriter