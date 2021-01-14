const { ErrorResponse } = require('../utils/Responses');

const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json(new ErrorResponse('Unauthorized'));
  }

  return next();
};

module.exports = requireAuth;
