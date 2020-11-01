const CustomError = require('./custom-error')

class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(message) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = NotFoundError
