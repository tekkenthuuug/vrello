class ErrorResponse {
  constructor(message = 'Internal server error', code = 500) {
    this.message = message;
    this.code = code;
  }
}

module.exports = ErrorResponse;
