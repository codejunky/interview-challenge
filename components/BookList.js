import Link from 'next/link'

import BookCard from './BookCard'

const BookList = ({ books }) => {
  return (
    <div className="list-container">
      {
        books.map(book => (
          <BookCard key={book.id} id={book.id} name={book.name} />
        ))
      }

      <style jsx>{`
        .list-container {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  )
}

export default BookList