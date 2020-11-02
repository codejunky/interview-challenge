const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')
require('express-async-errors')

const errorHandler = require('./middlewares/error-handler')
const bookRoutes = require('./routes/books')
const authorRoutes = require('./routes/authors')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  const server = express()

  server.use(bodyParser.json())
  server.use('/api', bookRoutes(app))
  server.use('/api', authorRoutes(app))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use(errorHandler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
