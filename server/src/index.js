const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const Redis = require('ioredis');
require('dotenv').config();

const createSessionConfig = require('./utils/createSessionConfig');
const initializeSocket = require('./socket');

const port = process.env.PORT || 5000;

// Redis client setup
const redisClient = new Redis(process.env.REDIS_URL);

// Middleware setup
const sessionMiddleware = session(createSessionConfig(redisClient));

// App setup
const app = express();
app.set('trust proxy', 1);

// App middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('combined'));
app.use(sessionMiddleware);
app.use(require('./routes'));

(async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });

    console.log('Connected to Mongo DB...');

    // Run app
    const server = app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });

    // Socket initialization
    initializeSocket(server, sessionMiddleware);
  } catch (error) {
    console.log(error);
  }
})();
