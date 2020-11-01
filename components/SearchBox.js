import { FiSearch } from 'react-icons/fi'
import { IconContext } from 'react-icons'

const SearchBox = () => {
  return (
    <div className="search-box">
      <div className="icon-container">
        <FiSearch />
      </div>
      <input type="text" placeholder="Find book by author or name" />

      <style jsx>{`
        .search-box {
          position: relative;
          width: 35%;
        }
        
        input[type="text"] {
          width: 100%;
          height: 40px;
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