import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'

const filePath = path.resolve('tasks.csv')

export const readCSV = () => {
    return new Promise((resolve, rejects) => {
        const results = []

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results)
            })
            .on('error', (err) => {
                rejects(err)
            })
    })
}