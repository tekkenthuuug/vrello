const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const Redis = require('ioredis');
require('dotenv').config();

const createSessionConfig = require('./utils/createSessionConfig');

const Board = require('./models/Board.model');

const handleBoardChangeEvent = require('./utils/handleBoardChangeEvent');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('combined'));
app.set('trust proxy', 1);

const redis = new Redis(process.env.REDIS_URL);

app.use(session(createSessionConfig(redis)));

const server = http.createServer(app);

const io = socketIo(server);

(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });
})();

app.use(require('./routes'));

io.on('connection', socket => {
  socket.emit('connected');

  socket.on('join', async boardId => {
    const board = await Board.findById(boardId)
      .populate({
        path: 'columns',
        populate: {
          path: 'cards',
        },
      })
      .exec();

    socket.emit('joined', board);

    socket.join(boardId);
  });

  socket.on('board-change', handleBoardChangeEvent(io));
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
