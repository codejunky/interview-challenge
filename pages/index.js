import Link from 'next/link'

import BookList from '../components/BookList'

export default function Home() {
  return (
    <div className="container">
      <div className="main-container">
        <h3>Available Books</h3>
        <BookList />
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
