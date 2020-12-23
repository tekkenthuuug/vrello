class Response {
  success;

  constructor(success) {
    this.success = success;
  }
}

class ErrorResponse extends Response {
  error;

  constructor(error) {
    super(false);
    this.error = error;
  }
}

exports.ErrorResponse = ErrorResponse;

class SuccessResponse extends Response {
  data;

  constructor(data) {
    super(true);
    this.data = data;
  }
}

exports.SuccessResponse = SuccessResponse;
