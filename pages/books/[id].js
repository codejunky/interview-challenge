import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import BookForm from '../../components/BookForm'
import ErrorMessage from '../../components/ErrorMessage'
import book_cover from '../../assets/images/book_cover.png'

const BookPage = ({ book, authors }) => {
  const router = useRouter()
  const [showEditForm, setShowEditForm] = useState(false)
  const [formError, setFormError] = useState('')

  const updateBook = async (name, isbn, authorId, description) => {
    const req = await fetch(`http://localhost:3000/api/books/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isbn,
        authorId,
        description
      })
    })

    if (req.status === 200) {
      const updatedBook = await req.json();
      setShowEditForm(false)
      setFormError('')
      router.push(`/books/${updatedBook.id}`)
    } else {
      setFormError(req.statusText)
    }
  }

  return (
    <div className="page-container">
      <div className="details-container">
        <div className="cover-container">
          <img src={book_cover} alt="Book Cover" />
        </div>
        <div className="book-details">
          <h2 className="book-title">{book.name}</h2>
          <span className="author-name">
            {book.author.firstName} {book.author.lastName}
          </span><br />
          <span className="book-isbn">ISBN: {book.isbn}</span>

          <p className="book-desc">
            {book.description}
          </p>

          <button onClick={() => setShowEditForm(!showEditForm)} className="btn">Edit Book</button>
          {showEditForm && (
            <>
              <BookForm authors={authors} book={book} onSubmit={updateBook} />
              {formError && <ErrorMessage message={formError} />}
            </>
          )}
        </div>
      </div>
      <Link href="/">
        <a className="back-btn">
          Back to book list
        </a>
      </Link>
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .details-container {
          display: flex;
          border-radius: 15px;
          background-color: rgba(235, 235, 235, 0.6);
          padding: 20px 0;
        }

        .cover-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30%;
        }

        .cover-container img {
          max-width: 70%;
        }

        .book-details {
          width: 70%;
          padding: 30px 10px;
        }

        .book-title {
          margin: 0;
          color: #284182;
        }

        .author-name {
          font-size: 17px;
          font-weight: 500;
          color: #A2A2A3;
          line-height: 20px;
        }

        .book-isbn {
          font-size: 14px;
          font-weight: 300;
          color: #aaa;
        }

        .book-desc {
          color: #555;
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
          padding: 10px 15px;
          border-radius: 10px;
          background-color: rgba(250, 250, 250, 0.8);
          box-shadow: 0.5px 0.5px 1px 0.5px #ccc;
          text-decoration: none;
          color: #777;
          margin-top: 15px;
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
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const req = await fetch(`http://localhost:3000/api/books/${id}`)
  const req2 = await fetch(`http://localhost:3000/api/authors`)
  const book = await req.json()
  let authors = await req2.json()

  authors = authors.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`
  }))


  return { props: { book, authors } }
}

export default BookPage