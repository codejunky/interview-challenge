import { useState } from 'react'
import isISBN from 'validator/lib/isISBN'
import isEmpty from 'validator/lib/isEmpty'
import isIn from 'validator/lib/isIn'
import isLength from 'validator/lib/isLength'

import AuthorForm from './AuthorForm'
import ErrorMessage from './ErrorMessage'

const BookForm = ({ authors, onSubmit, book = {} }) => {
  const [authorList, setAuthorsList] = useState(authors);
  const [bookAttr, setBookAttr] = useState({
    name: book.name || '',
    isbn: book.isbn || '',
    authorId: book.author?.id || '',
    description: book.description || ''
  })

  const [errors, setErrors] = useState({
    name: '',
    isbn: '',
    authorId: '',
    description: ''
  })

  const [formError, setFormError] = useState('')

  const addNewAuthor = async (firstName, lastName) => {
    const req = await fetch('http://localhost:3000/api/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName
      })
    })

    if (req.status === 201) {
      const author = await req.json()
      setAuthorsList([
        ...authorList,
        { id: author.id, name: `${author.firstName} ${author.lastName}` }
      ])
      setShowAuthorForm(false)
      setFormError('')
    } else {
      setFormError(req.statusText)
    }
  }

  const [showAuthorForm, setShowAuthorForm] = useState(false)

  const validateAttr = attr => {
    let message
    switch (attr) {
      case 'name':
        if (isEmpty(bookAttr[attr])) {
          message = 'Name is required!'
        } else {
          message = ''
        }
        break;
      case 'isbn':
        if (!isISBN(bookAttr[attr])) {
          message = 'Please provide a valid ISBN.'
        } else {
          message = ''
        }
        break;
      case 'authorId':
        if (!isIn(bookAttr[attr], authors.map(auth => auth.id))) {
          message = 'Please select an author from the list.'
        } else {
          message = ''
        }
        break;
      case 'description':
        if (!isLength(bookAttr[attr], { min: 50 })) {
          message = 'Please provide a description that is at least 50 characters long.'
        } else {
          message = ''
        }
        break;
    }

    setErrors({
      ...errors,
      [attr]: message
    })
  }

  const onChangeHandler = (attr, value) => {
    setBookAttr({
      ...bookAttr,
      [attr]: value
    })
  }

  const handleOnSubmit = () => {
    const { name, isbn, authorId, description } = bookAttr

    if ((Object.values(errors)).every(e => e.length === 0)) {
      onSubmit(name, isbn, parseInt(authorId), description)
    }
  }

  const { name, isbn, authorId, description } = bookAttr
  return (
    <div className="form-container">
      <div className="input-group">
        <label htmlFor="name">Name:</label>
        <input
          onChange={(e) => onChangeHandler('name', e.target.value)}
          onBlur={e => validateAttr('name')}
          value={name}
          type="text"
          name="name"
        />
        {errors.name && <ErrorMessage message={errors.name} />}
      </div>
      <div className="input-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          onChange={(e) => onChangeHandler('isbn', e.target.value)}
          onBlur={e => validateAttr('isbn')}
          value={isbn}
          type="text"
          name="isbn"
        />
        {errors.isbn && <ErrorMessage message={errors.isbn} />}
      </div>
      <div className="input-group">
        <label htmlFor="authorId">Author:</label>
        <select
          onChange={(e) => onChangeHandler('authorId', e.target.value)}
          onBlur={e => validateAttr('authorId')}
          value={authorId}
          name="authorId"
        >
          <option>Select an author</option>
          {
            authorList.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))
          }
        </select>
        {errors.authorId && <ErrorMessage message={errors.authorId} />}

        <span onClick={() => setShowAuthorForm(!showAuthorForm)} className="new-author-btn">
          New author?
        </span>
        {showAuthorForm && (
          <>
            <AuthorForm onSubmit={addNewAuthor} />
            {formError && <ErrorMessage message={formError} />}
          </>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="description">Description:</label>
        <textarea
          onChange={(e) => onChangeHandler('description', e.target.value)}
          onBlur={e => validateAttr('description')}
          value={description}
          name="description"
          cols="30"
          rows="10"
        ></textarea>
        {errors.description && <ErrorMessage message={errors.description} />}
      </div>
      <button onClick={handleOnSubmit} className="btn">Submit</button>

      <style jsx>{`
        .form-container {
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0.5px 0.5px 1px 1px #ccc;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }

        label {
          margin-bottom: 5px;
          color: #555;
        }

        input[type="text"], select {
          width: 100%;
          height: 5vh;
          padding: 5px 10px;
          outline: none;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        textarea {
          padding: 5px 10px;
          outline: none;
          border: 1px solid #ddd;
          border-radius: 5px;
          resize: none;
        }

        .btn {
          width: 10vw;
          padding: 10px;
          outline: none;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          background-color: #0096c7;
          color: #fff;
        }

        .new-author-btn {
          margin: 5px 0 0 0;
          text-decoration: underline;
          color: #0096c7;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default BookForm