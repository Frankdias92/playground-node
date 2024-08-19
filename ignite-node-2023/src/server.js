import http from 'http'

const server = http.createServer((req, res) => {
    return res.end('hello node')
})

server.listen(3333)