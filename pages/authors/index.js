import { route } from 'next/dist/next-server/server/router'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AuthorsPage = ({ authors }) => {
  const router = useRouter()
  return (
    <div className="page-container">
      <div className="authors-wrapper">
        {
          authors.map((author) => {
            const { id, firstName, lastName, books } = author
            return (
              <div key={id} className="author-box">
                <div className="author-header">
                  <h4>{`${firstName} ${lastName}`}</h4>
                  <button
                    onClick={() => {
                      router.push({
                        pathname: `/authors/${id}`,
                        query: { author: JSON.stringify(author) }
                      })
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                </div>
                <span className="header">Books</span>
                {
                  books.map(({ id: bookId, name }) => {
                    return (
                      <Link key={bookId} href={`/books/${bookId}`}>
                        <a>{name}</a>
                      </Link>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <button onClick={() => router.push('/authors/add')} className="btn">
        New Author
      </button>

      <style jsx>{`
        .authors-wrapper {
          display: flex;
          flex-wrap: wrap
        }

        .author-box {
          display: flex;
          flex-direction: column;
          width: 32%;
          margin: 0 10px 10px 0;
          border-radius: 10px;
          box-shadow: 1px 1px 1px 1px #ccc;
          padding: 10px;
        }

        .author-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h4 {
          margin: 0 0 5px 0;
          color: #444;
        }

        .header {
          font-size: 14px;
          color: #888;
        }

        a {
          text-decoration: none;
          color: #0096c7;
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

        .edit-btn {
          width: 5vw;
          outline: none;
          border: none;
          background: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer; 
          color: #0096c7;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async () => {
  const req = await fetch('http://localhost:3000/api/authors?books=yes')
  const authors = await req.json()

  return { props: { authors } }
}

export default AuthorsPage