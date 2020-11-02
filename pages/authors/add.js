import { useRouter } from 'next/router'
import { useState } from 'react'

import AuthorForm from '../../components/AuthorForm'
import ErrorMessage from '../../components/ErrorMessage'

const NewAuthorPage = () => {
  const router = useRouter()
  const [error, setError] = useState(null)

  const updateAuthor = async (firstName, lastName) => {
    const req = await fetch(`http://localhost:3000/api/authors/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName
      })
    })

    if (req.status === 201) {
      router.push('/authors')
    } else {
      setError(req.statusText)
    }
  }

  return (
    <div className="page-container">
      <AuthorForm onSubmit={updateAuthor} />
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

export default NewAuthorPage