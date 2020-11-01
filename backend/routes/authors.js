const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { Author, Book } = require('../models')
const validateRequest = require('../middlewares/validate-request')
const NotFoundError = require('../errors/not-found-error')

const authorRoutes = (app) => {
  router.get('/authors', async (req, res) => {
    const authors = await Author.findAll()
    return res.json(authors)
  })

  router.post(
    '/authors',
    [
      body('firstName').not().isEmpty().withMessage('First name is required!'),
      body('lastName').not().isEmpty().withMessage('Last name is required!')
    ],
    validateRequest,
    async (req, res) => {
      const { firstName, lastName } = req.body

      const newAuthor = await Author.create({ firstName, lastName })
      return res
        .status(201)
        .json(newAuthor)
    })

  router.get('/authors/:id', async (req, res) => {
    const { id } = req.params

    const author = await Author.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName'],
      include: [{ model: Book, as: 'books', attributes: ['id', 'name', 'isbn'] }]
    })

    if (!author) {
      throw new NotFoundError('Author does not exist!')
    }

    return res.json(author)
  })

  router.put(
    '/authors/:id',
    [
      body('firstName').not().isEmpty().withMessage('First name is required!'),
      body('lastName').not().isEmpty().withMessage('Last name is required!')
    ],
    validateRequest,
    async (req, res) => {
      const { id } = req.params

      const author = await Author.findByPk(id)
      if (!author) {
        throw new NotFoundError('Author does not exist')
      }

      const { firstName, lastName } = req.body
      author.firstName = firstName
      author.lastName = lastName
      author.save()

      return res.json(author)
    }
  )

  return router
}

module.exports = authorRoutes;