import express from 'express'
import routes from './routes/index.js'
import bodyParser from 'body-parser'

const app = express()

app.use(express.json())

app.use(bodyParser.json())
app.use('/tasks', routes)

app.listen(3333, () => {
    console.log('server is running on port 3333')
})
