const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { Op } = require('sequelize')

const validateRequest = require('../middlewares/validate-request')
const NotFoundError = require('../errors/not-found-error')
const { Book, Author } = require('../models')

const bookRoutes = (app) => {
  router.get('/books', async (req, res) => {
    const { search } = req.query
    let books = await Book.findAll({
      where: {
        name: {
          [Op.like]: `%${search || ''}%`
        }
      },
      attributes: ['name', 'isbn', 'id'],
      include: ['author']
    })

    if (search && !books.length) {
      const author = await Author.findOne({
        where: {
          [Op.or]: {
            firstName: {
              [Op.like]: `%${search}%`
            },
            lastName: {
              [Op.like]: `%${search}%`
            }
          }
        },
        include: [{
          model: Book,
          as: 'books',
          attributes: ['name', 'isbn', 'description'],
          include: ['author']
        }]
      })

      books = author?.books || [];
    }
    return res.json(books)
  })

  router.post(
    '/books',
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('isbn')
        .isISBN()
        .withMessage('A valid ISBN is required'),
      body('description')
        .isLength({ min: 100 })
        .withMessage('Please provide a meaningful description for the book'),
      body('authorId')
        .isNumeric({ gt: 0 })
        .withMessage('Please select a valid author'),

    ],
    validateRequest,
    async (req, res) => {
      const { name, isbn, description, authorId } = req.body

      const newBook = await Book.create({ name, isbn, description, authorId })
      return res
        .status(201)
        .json(newBook);
    })

  router.get('/books/:id', async (req, res) => {
    const { id } = req.params

    const book = await Book.findByPk(id, {
      attributes: ['id', 'name', 'isbn', 'description'],
      include: [{ model: Author, as: 'author', attributes: ['id', 'firstName', 'lastName'] }]
    })

    if (!book) {
      throw new NotFoundError('This book does not exist!')
    }

    return res.json(book)
  })

  router.put(
    '/books/:id',
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('isbn')
        .isISBN()
        .withMessage('A valid ISBN is required'),
      body('description')
        .isLength({ min: 100 })
        .withMessage('Please provide a meaningful description for the book'),
      body('authorId')
        .isNumeric({ gt: 0 })
        .withMessage('Please select a valid author'),

    ],
    validateRequest,
    async (req, res) => {
      const { id } = req.params;

      const book = await Book.findByPk(id);

      if (!book) {
        throw new NotFoundError('Book does not exist!')
      }

      const { name, isbn, description, authorId } = req.body
      book.name = name
      book.isbn = isbn
      book.description = description
      book.authorId = authorId
      book.save()

      return res.json(book)
    }
  )

  return router
}

module.exports = bookRoutes