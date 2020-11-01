import Link from 'next/link'

import bookCover from '../assets/images/book_cover.png'

const BookCard = ({ id, name }) => {
  return (
    <div className="card-container">
      <Link href={`/books/${id}`}>
        <a className="cover-link">
          <div className="cover-container">
            <img src={bookCover} alt="Book cover" />
          </div>
          <span className="book-title">
            {name}
          </span>
        </a>
      </Link>

      <style jsx>{`
        .card-container {
          display: flex;
          flex-direction: column;
          width: 23%;
          height: 320px;
          margin-right: 15px;
          margin-bottom: 30px;
        }

        .cover-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 85%;
          border-radius: 10px;
          box-shadow: 1px 1px 2px 1px #eee;
          background-color: rgba(200, 200, 200, 0.2);
          margin-bottom: 15px;
        }
        
        .cover-container img {
          max-width: 70%;
        }

        .cover-link {
          text-decoration: none;
          height: 100%;
        }

        .book-title {
          display: block;
          font-size: 16px;
          font-weight: 400;
          color: #888;
        }
      `}</style>
    </div>
  )
}

export default BookCard