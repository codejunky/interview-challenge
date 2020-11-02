const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className="error">{message}</p>
      <style jsx>{`
        .error {
          margin: 0;
          margin-top: 5px;
          color: red;
        }
      `}</style>
    </>
  )
}

export default ErrorMessage