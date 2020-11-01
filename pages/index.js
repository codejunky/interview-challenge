import Link from 'next/link'

import BookList from '../components/BookList'

function Home({ books }) {
  return (
    <div className="container">
      <div className="main-container">
        <h3>Available Books</h3>
        <BookList books={books} />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const req = await fetch('http://localhost:3000/api/books')
  const books = await req.json()

  return { props: { books } }
}

export default Home