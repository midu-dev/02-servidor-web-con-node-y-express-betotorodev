const express = require('express')

const app = express()

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  const desiredPort = process.env.PORT ?? 1234
  // const server = app.listen(...)
  // return server

  app.use(express.json())

  app.get('/', (req, res) => {
    res.status(200).send('<h1>¡Hola mundo!</h1>')
  })
  app.get('/logo.webp', express.static('assets'))
  app.get('/404', (req, res) => {
    res.status(404).send('<h1>404</h1>')
  })
  app.post('/contacto', (req, res) => {
    res.status(201).json(req.body)
  })

  app.use((req, res) => {
    const { method, url } = req
    if (method === 'POST' && url !== '/contacto') return res.status(405).send('Not a valid a route to make a post')
    if (method !== 'POST' && method !== 'GET') return res.status(405).send('Not a valid method')

    res.status(404).send('<h1> 404 <h1/>')
  })
  const server = app.listen(desiredPort, () => {})

  return server
}

module.exports = {
  startServer
}
