import { useRouter } from 'next/router'
import { useState } from 'react'

import BookForm from '../../components/BookForm'
import ErrorMessage from '../../components/ErrorMessage'

const AddBook = ({ authors }) => {
  const router = useRouter()
  const [error, setError] = useState(undefined)

  const addBook = async (name, isbn, authorId, description) => {
    const res = await fetch('http://localhost:3000/api/books/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        isbn,
        authorId,
        description
      })
    })

    if ([200, 201].includes(res.status)) {
      const book = await res.json()
      router.push(`/books/${book.id}`)
    } else {
      setError(res.statusText)
    }
  }

  return (
    <div className="page-container">
      <p>Please fill in the follwing form to add a new book:</p>
      <BookForm authors={authors} onSubmit={addBook} />
      {error && <ErrorMessage message={error} />}

      <style jsx>{`
        .page-container {
          width: 80%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}


export const getServerSideProps = async () => {
  const req = await fetch('http://localhost:3000/api/authors')
  let authors = await req.json()

  authors = authors.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`
  }))

  return { props: { authors } }
}

export default AddBook