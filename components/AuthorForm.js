import { useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'

import ErrorMessage from './ErrorMessage'

const AuthorForm = ({ onSubmit, author = {} }) => {
  const [authorAttrs, setAuthorAttrs] = useState({
    firstName: author.firstName || '',
    lastName: author.lastName || ''
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: ''
  })

  const validateAttr = attr => {
    let message = ''
    if (isEmpty(authorAttrs[attr])) {
      message = `The field ${attr} is required.`
    }

    setErrors({
      ...errors,
      [attr]: message
    })
  }

  const onChangeHandler = (attr, value) => {
    setAuthorAttrs({
      ...authorAttrs,
      [attr]: value
    })
  }

  const handleOnSubmit = () => {
    const { firstName, lastName } = authorAttrs

    if (Object.values(errors).every(e => e.length === 0)) {
      onSubmit(firstName, lastName)
    }
  }

  const { firstName, lastName } = authorAttrs
  return (
    <div className="form-container">
      <div className="input-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          onChange={(e) => onChangeHandler('firstName', e.target.value)}
          onBlur={e => validateAttr('firstName')}
          value={firstName}
          type="text"
          name="firstName"
        />
        {errors.firstName && <ErrorMessage message={errors.firstName} />}
      </div>
      <div className="input-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          onChange={(e) => onChangeHandler('lastName', e.target.value)}
          onBlur={e => validateAttr('lastName')}
          value={lastName}
          type="text"
          name="lastName"
        />
        {errors.lastName && <ErrorMessage message={errors.lastName} />}
      </div>

      <button onClick={handleOnSubmit} className="btn">Submit</button>

      <style jsx>{`
        .form-container {
          margin-top: 5px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0.5px 0.5px 1px 1px #ccc;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }

        label {
          margin-bottom: 5px;
          color: #555;
        }

        input[type="text"], select {
          width: 100%;
          height: 5vh;
          padding: 5px 10px;
          outline: none;
          border: 1px solid #ddd;
          border-radius: 5px;
        }

        textarea {
          padding: 5px 10px;
          outline: none;
          border: 1px solid #ddd;
          border-radius: 5px;
          resize: none;
        }

        .btn {
          width: 10vw;
          padding: 10px;
          outline: none;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          background-color: #0096c7;
          color: #fff;
        }
      `}</style>
    </div>
  )
}

export default AuthorForm