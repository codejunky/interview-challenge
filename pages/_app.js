import 'isomorphic-unfetch'

import NavBar from '../components/NavBar'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="container">
      <NavBar />
      <Component {...pageProps} />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Roboto', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          margin: 20px auto;
          max-width: 900px;
        }
      `}</style>
    </div>
  )
}

export default MyApp