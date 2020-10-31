const express = require('express')
const router = express.Router()

const authorRoutes = (app) => {
  router.get('/authors', (req, res) => {
    return res.json({
      authors: [
        {
          name: "Oussama Bouguerne"
        },
        {
          name: "Cal Newport"
        },
        {
          name: "James Haksly"
        },
      ]
    })
  })

  return router
}

module.exports = authorRoutes;