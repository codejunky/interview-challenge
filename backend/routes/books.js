const express = require('express')
const router = express.Router()

const bookRoutes = (app) => {
  router.get('/books', (req, res) => {
    return res.json({
      books: [
        {
          title: "How to be a fucking jerk",
          author: "John McNugget"
        },
        {
          title: "Learn software development and earn money",
          author: "Oussama Bouguerne"
        },
        {
          title: "Freelancing in the age of Corona",
          author: "James Smith"
        }
      ]
    })
  })

  return router
}

module.exports = bookRoutes;