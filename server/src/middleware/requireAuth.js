const ErrorResponse = require('../utils/ErrorResponse');

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return next(new ErrorResponse('Unauthorized', 401));
  }

  return next();
};

module.exports = requireAuth;
