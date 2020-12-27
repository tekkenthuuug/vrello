const { SESSION_COOKIE_NAME, __prod__ } = require('./constants');
const session = require('express-session');
const connectRedis = require('connect-redis');
require('dotenv').config();

const createSessionConfig = redis => {
  const RedisStore = connectRedis(session);

  return {
    name: SESSION_COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      secure: __prod__, // cookie only works in https
      sameSite: 'lax', // CSRF
      domain: __prod__ ? '.maksimdev.com' : undefined,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
};

module.exports = createSessionConfig;
