import fs from 'fs'
import path, { resolve } from 'path'
import csv from 'csv-parser'
import { rejects } from 'assert'

const filePath = path.resolve('data.csv')

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