import Link from 'next/link'

import book_cover from '../../assets/images/book_cover.png'

const BookPage = ({ book }) => {
  return (
    <div className="page-container">
      <div className="details-container">
        <div className="cover-container">
          <img src={book_cover} alt="Book Cover" />
        </div>
        <div className="book-details">
          <h2 className="book-title">{book.name}</h2>
          <span className="author-name">
            {book.author.firstName} {book.author.lastName}
          </span><br />
          <span className="book-isbn">ISBN: {book.isbn}</span>

          <p className="book-desc">
            {book.description}
          </p>
        </div>
      </div>
      <Link href="/">
        <a className="back-btn">
          Back to book list
        </a>
      </Link>
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .details-container {
          display: flex;
          border-radius: 15px;
          background-color: rgba(235, 235, 235, 0.6);
          padding: 20px 0;
        }

        .cover-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30%;
        }

        .cover-container img {
          max-width: 70%;
        }

        .book-details {
          width: 70%;
          padding: 30px 10px;
        }

        .book-title {
          margin: 0;
          color: #284182;
        }

        .author-name {
          font-size: 17px;
          font-weight: 500;
          color: #A2A2A3;
          line-height: 20px;
        }

        .book-isbn {
          font-size: 14px;
          font-weight: 300;
          color: #aaa;
        }

        .book-desc {
          color: #555;
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
          padding: 10px 15px;
          border-radius: 10px;
          background-color: rgba(250, 250, 250, 0.8);
          box-shadow: 0.5px 0.5px 1px 0.5px #ccc;
          text-decoration: none;
          color: #777;
          margin-top: 15px;
        }
      `}</style>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }) => {
  const req = await fetch(`http://localhost:3000/api/books/${id}`)
  const book = await req.json()

  return { props: { book } }
}

export default BookPage