import BookCard from './BookCard'

const BookList = () => {
  return (
    <div className="list-container">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />

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