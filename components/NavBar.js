import Link from 'next/link'
import { useRouter } from 'next/router'

import SearchBox from './SearchBox'

const NavBar = () => {
  const router = useRouter()

  const isActive = href => {
    return router.pathname === href
  }

  return (
    <div className="nav-container">
      <div className="nav-left">
        <Link href="/">
          <h1>Book List</h1>
        </Link>
        <div className="divider" />
        <nav className="nav-menu">
          <Link href="/">
            <a className={`menu-item ${isActive('/') ? 'selected' : ''}`}>
              Home
            </a>
          </Link>
          <Link href="/books/add">
            <a className={`menu-item ${isActive('/books/add') ? 'selected' : ''}`}>
              Add book
            </a>
          </Link>
        </nav>
      </div>
      <SearchBox />
      <style jsx>{`
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 10vh;
        }

        .nav-left {
          display: flex;
          align-items: center;
        }

        .nav-left h1 {
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
        }

        .divider {
          width: 0;
          height: 25px;
          border: 1px solid #777;
          margin-left: 20px;
        }

        .nav-menu {
          margin-left: 15px;
        }

        .menu-item {
          margin-right: 15px;
          text-decoration: none;
          color: #555;
        }

        .selected {
          color: #0077b6;
        }
      `}</style>
    </div>
  )
}

export default NavBar