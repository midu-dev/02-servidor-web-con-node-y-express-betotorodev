const fs = require('node:fs')
const http = require('node:http')

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  // return server
  const desiredPort = process.env.POR ?? 1234
  const processRequest = (req, res) => {
    const { url, method } = req

    switch (method) {
      case 'GET':
        switch (url) {
          case '/':
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end('<h1>¡Hola mundo!</h1>')
            break
          case '/logo.webp':
            fs.readFile('./assets/logo.webp', (err, data) => {
              if (err) {
                res.statusCode = 500
                res.end('Internal server error')
                console.log(err)
              } else {
                res.setHeader('Content-Type', 'image/webp')
                res.end(data)
              }
            })
            break
          case '/404':
            res.statusCode = 404
            res.end('<h1>404</h1>')
            break

          default:
            res.statusCode = 404
            res.end('route not found')
            break
        }
        break
      case 'POST':
        if (url === '/contacto') {
          let body = ''

          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            })

            res.end(JSON.stringify(data))
          })
        } else {
          res.statusCode = 405
          res.end('not a valid route')
        }
        break
      default:
        res.statusCode = 405
        res.end('not a valid method')
        break
    }
  }

  const server = http.createServer(processRequest)

  server.listen(desiredPort, () => { console.log(`Listening in port http://localhost:${desiredPort}`) })

  return server
}

module.exports = {
  startServer
}
