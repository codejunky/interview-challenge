import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <NavBar />
      <Component {...pageProps} />

      <style jsx>{`
        .container {
          margin: 20px auto;
          max-width: 900px;
        }
      `}</style>
    </div>
  )
}

export default MyApp