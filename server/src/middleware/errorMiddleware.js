const ErrorResponse = require('../utils/ErrorResponse');

const responseMiddleware = (errorObj, req, res, next) => {
  if (errorObj.name === 'ValidationError') {
    const formattedErrors = Object.keys(errorObj.errors).reduce(
      (errors, key) => {
        errors[key] = errorObj.errors[key].message;

        return errors;
      },
      {}
    );

    return res.status(422).json({ code: 422, errors: formattedErrors });
  }

  if (errorObj instanceof ErrorResponse) {
    return res.status(errorObj.code).json(errorObj);
  } else {
    return res.status(500).json('Internal server error');
  }
};

module.exports = responseMiddleware;
