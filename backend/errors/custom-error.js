// This class shouldn't be instantiated directly

class CustomError extends Error {
  statusCode = null

  constructor(message) {
    super(message)
  }

  serializeErrors() {
    return []
  }
}

module.exports = CustomError