import { useRouter } from 'next/router'
import { useState } from 'react'

import AuthorForm from '../../components/AuthorForm'
import ErrorMessage from '../../components/ErrorMessage'

const EditAuthor = ({ author }) => {
  const router = useRouter()
  const [error, setError] = useState(null)

  const updateAuthor = async (firstName, lastName) => {
    const req = await fetch(`http://localhost:3000/api/authors/${author.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName
      })
    })

    if (req.status === 200) {
      router.push('/authors')
    } else {
      setError(req.statusText)
    }
  }

  return (
    <div className="page-container">
      <AuthorForm author={author} onSubmit={updateAuthor} />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const req = await fetch(`http://localhost:3000/api/authors/${id}`)
  const author = await req.json()

  return { props: { author } }
}

export default EditAuthor