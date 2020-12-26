const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const connectRedis = require('connect-redis');
const Redis = require('ioredis');
require('dotenv').config();

const { SESSION_COOKIE_NAME, __prod__ } = require('./src/utils/constants');

const Board = require('./src/models/Board.model');
const Column = require('./src/models/Column.model');
const Card = require('./src/models/Card.model');

const handleBoardChangeEvent = require('./src/utils/handleBoardChangeEvent');

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

const RedisStore = connectRedis(session);
const redis = new Redis(process.env.REDIS_URL);

// Session
app.use(
  session({
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
  })
);

const server = http.createServer(app);

const io = socketIo(server);

const addBoard = async () => {
  await Board.remove({});
  await Card.remove({});
  await Column.remove({});

  const boardData = {
    id: '0',
    name: 'Board',
    columns: [
      {
        id: '0',
        name: 'Column 1',
        cards: [
          { id: '0', description: 'Text1' },
          { id: '1', description: 'Text2' },
        ],
      },
      {
        id: '1',
        name: 'Column 2',
        cards: [
          { id: '2', description: 'Text3' },
          { id: '3', description: 'Text4' },
        ],
      },
      {
        id: '2',
        name: 'Column 3',
        cards: [
          { id: '4', description: 'Text5' },
          { id: '5', description: 'Text6' },
        ],
      },
    ],
  };

  let columns = [];

  for (let i = 0; i < boardData.columns.length; i++) {
    const currentColumn = boardData.columns[i];

    let cards = [];

    for (let j = 0; j < currentColumn.cards.length; j++) {
      const currentCard = currentColumn.cards[j];

      const card = new Card({ description: currentCard.description });

      card.save();

      cards.push(card._id);
    }

    const column = new Column({ name: currentColumn.name, cards });

    column.save();

    columns.push(column._id);
  }

  const board = new Board({ name: 'Board', columns });

  board.save();
};

(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  });

  // addBoard();
})();

app.use(require('./src/routes'));

io.on('connection', socket => {
  Board.findOne({})
    .populate({
      path: 'columns',
      populate: {
        path: 'cards',
      },
    })
    .exec((err, board) => {
      socket.emit('connected', board);
    });

  socket.on('join', room => {
    socket.join(room);
  });

  socket.on('board-change', handleBoardChangeEvent(io));
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
