const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const Redis = require('ioredis');
const IOMiddlewareWrapper = require('./middleware/IOMiddlewareWrapper');
require('dotenv').config();

const createSessionConfig = require('./utils/createSessionConfig');

const Board = require('./models/Board.model');
const BoardMember = require('./models/BoardMember.model');

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

const sessionMiddleware = session(createSessionConfig(redis));

io.use(IOMiddlewareWrapper(sessionMiddleware));

app.use(sessionMiddleware);

app.use(require('./routes'));

io.on('connection', socket => {
  socket.emit('connected');
  socket.on('join', async boardId => {
    // check if user has access to this board
    const { session } = socket.request;
    const board = await Board.findById(boardId);

    const userToBoardRel = await BoardMember.findOne({
      board: boardId,
      member: session.userId,
    });

    if (String(board.creatorId) === session.userId || userToBoardRel) {
      const populatedBoard = await board
        .populate({
          path: 'columns',
          populate: {
            path: 'cards',
          },
        })
        .execPopulate();

      socket.emit('joined', populatedBoard);

      socket.join(boardId);
    } else {
      socket.emit('no-access');
    }
  });

  socket.on('board-change', handleBoardChangeEvent(io, socket));
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
