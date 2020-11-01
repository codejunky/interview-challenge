import bookCover from '../assets/images/book_cover.png'

const BookCard = () => {
  return (
    <div className="card-container">
      <div className="cover-container">
        <img src={bookCover} alt="Book cover" />
      </div>
      <span className="book-title">
        Title Here
      </span>

      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: column;
          width: 22%;
          height: 300px;
          margin-right: 25px;
          margin-bottom: 30px;
        }

        .cover-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 95%;
          border-radius: 10px;
          box-shadow: 1px 1px 2px 1px #eee;
          background-color: rgba(200, 200, 200, 0.2);
          margin-bottom: 15px;
        }
        
        .cover-container img {
          max-width: 85%;
          max-height: 85%;
        }

        .book-title {
          font-size: 18px;
          font-weight: 400;
          color: #888;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

export default BookCard