const SESSION_COOKIE_NAME = 'uid';
const __prod__ = process.env.NODE_ENV === 'production';

module.exports = {
  SESSION_COOKIE_NAME,
  __prod__,
};
