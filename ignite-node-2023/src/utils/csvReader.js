import fs from 'fs';
import csvParser from 'csv-parser';

export async function readCSV() {
  return new Promise((resolve, reject) => {
    const tasks = [];
    fs.createReadStream('tasks.csv')
      .pipe(csvParser({ separator: '  ' }))
      .on('data', (row) => {
        // console.log('Row', row)
        const task = {
          id: row['id'],
          title: row['title'],
          description: row['description'],
          created_at: row['created_at'],
          updated_at: row['updated_at'],
          completed_at: row['completed_at'] || null,
          is_completed: row['is_completed'] === 'true',
        };
        tasks.push(task);
      })
      .on('end', () => {
        resolve(tasks);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}