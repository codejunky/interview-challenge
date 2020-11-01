import Link from 'next/link'

import BookList from '../components/BookList'

export default function Home({ books }) {
  return (
    <div className="container">
      <div className="main-container">
        <h3>Available Books</h3>
        <BookList books={books} />
      </div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Roboto', sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

Home.getInitialProps = async () => {
  const req = await fetch('http://localhost:3000/api/books')
  const books = await req.json()

  return books
}
