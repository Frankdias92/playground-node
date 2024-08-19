import http from 'node:http'
import { routes } from './routes'


const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    return res.json({message: route})
})

server(http('/tasks', (req, res) => {
    return res.end('tasks working?')
}))

server.listen(3333)