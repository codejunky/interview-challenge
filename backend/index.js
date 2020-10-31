const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  const bookRoutes = require('./routes/books')
  const authorRoutes = require('./routes/authors')

  server.use(bodyParser.json())
  server.use('/api', bookRoutes(app))
  server.use('/api', authorRoutes(app))

  // server.get('/a', (req, res) => {

  // })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
