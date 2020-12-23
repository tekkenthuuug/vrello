const { ErrorResponse } = require('../utils/Responses');

const validationErrorMiddleware = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    const formatedErrors = Object.keys(error.errors).reduce((errors, key) => {
      errors[key] = error.errors[key].message;

      return errors;
    }, {});

    return res.status(422).json(new ErrorResponse(formatedErrors));
  }

  return next(error);
};

module.exports = validationErrorMiddleware;
