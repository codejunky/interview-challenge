import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import { useRouter } from 'next/router'
import _ from 'lodash'

import book_cover from '../assets/images/book_cover.png'

const SearchBox = () => {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState([])
  const router = useRouter()

  const handleSearch = async e => {
    const { value } = e.target;

    if (value?.length > 0) {
      const req = await fetch(`http://localhost:3000/api/books?search=${value}`)

      if (req.status === 200) {
        const books = await req.json()
        console.log("Results => ", books)
        setResults(books)
        setShowResults(true)
      }
    } else {
      setResults([])
      setShowResults(false)
    }
  }

  return (
    <div className="search-box">
      <div className="icon-container">
        <FiSearch />
      </div>
      <input
        onChange={e => handleSearch(e)}
        onBlur={() => {
          setTimeout(() => {
            setShowResults(false)
          }, 250)
        }}
        onFocus={() => results.length ? setShowResults(true) : setShowResults(false)}
        type="text"
        placeholder="Find book by author or name"
      />

      {showResults && results.length && (
        <div className="results-container">
          {results.map(({ name, isbn, author, id }, i, res) => {
            return (
              <React.Fragment key={id}>
                <div
                  onClick={() => {
                    router.replace(`/books/${id}`)
                  }}
                  className="result-wrapper">
                  <div className="img-wrapper">
                    <img src={book_cover} alt="Book Cover" />
                  </div>
                  <div className="result-details">
                    <h3 className="book-title">{name}</h3>
                    <span className="book-author">
                      {`${author.firstName} ${author.lastName}`}
                    </span>
                    <span className="book-isbn">{isbn}</span>
                  </div>
                </div>
                { i < res.length - 1 ? <div className="divider" /> : null}
              </React.Fragment>
            )
          })}
        </div>
      )
      }

      <style jsx>{`
        .search-box {
          position: relative;
          width: 35%;
        }

        .results-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: absolute;
          margin-top: 10px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 1px 1px 1px 0.5px #ccc;
          padding: 10px;
        }

        .divider {
          height: 1px;
          width: 90%;
          background-color: rgba(200, 200, 200, 0.8);
          margin: 5px 0;
        }

        .result-wrapper {
          display: flex;
          height: 50px;
          cursor: pointer;
        }

        .book-title {
          margin: 0;
          font-size: 13px;
          color: #333;
        }

        .book-author {
          font-size: 11px;
          color: #666;
        }

        .book-isbn {
          font-size: 10px;
          margin: 2px 0;
          color: #aaa;
        }

        .img-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25%;
        }

        .img-wrapper img {
          max-width: 45%;
        }

        .result-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        input[type="text"] {
          width: 100%;
          height: 5vh;
          padding: 5px 10px 5px 50px;
          outline: none;
          border: none;
          border-radius: 15px;
          box-shadow: 2px 1px 3px 2px #eee;
        }

        .icon-container {
          position: absolute;
          top: 10.5px;
          left: 25px;
        }
      `}</style>
    </div >
  )
}

export default SearchBox