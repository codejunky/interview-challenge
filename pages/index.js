import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <ul>
        <li>
          <Link href="/a">
            <a>a</a>
          </Link>
        </li>
        <li>
          <Link href="/b">
            <a>b</a>
          </Link>
        </li>
      </ul>
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
      `}</style>
    </div>

  )
}
