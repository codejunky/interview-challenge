import SearchBox from './SearchBox'

const NavBar = () => {
  return (
    <div className="nav-container">
      <h1>Book List</h1>
      <SearchBox />
      <style jsx>{`
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 10vh;
        }

        h1 {
          font-weight: 800;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

export default NavBar