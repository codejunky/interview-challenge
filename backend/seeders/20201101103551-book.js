'use strict';

const { books } = require('./data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const booksData = books.map(({ title: name, isbn, description }, index) => ({
      name,
      isbn,
      description,
      authorId: index + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Books', booksData, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {})
  }
};
