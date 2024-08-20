import fs from 'fs'
import path from 'path'
import { createObjectCsvWriter } from 'csv-writer' 

const filePath = path.resolve('data.csv')

const fileExists = fs.existsSync(filePath)

const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
        { id: 'id', title: 'Id'},
        { id: 'name', title: 'Name'},
    ],
    append: true,
})

if (!fileExists) {
    csvWriter.writeRecords([])
}

export default csvWriter