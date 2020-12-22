const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const Board = require('./src/models/Board.model');
const Column = require('./src/models/Column.model');
const Item = require('./src/models/Item.model');

const handleBoardChangeEvent = require('./src/utils/handleBoardChangeEvent');

// const creditCardRouter = require("./src/controllers/creditCard.controller");

// Creating an express app
const app = express();

// Parsing post request body
app.use(express.json());

// CORS
app.use(cors());
app.use(helmet());

// Logging
app.use(morgan('combined'));

// Server
const server = http.createServer(app);

// Socket.io
const io = socketIo(server);

const addBoard = async () => {
  await Board.remove({});
  await Item.remove({});
  await Column.remove({});

  const boardData = {
    id: '0',
    name: 'Board',
    data: [
      {
        id: '0',
        name: 'Column 1',
        items: [
          { id: '0', description: 'Text1' },
          { id: '1', description: 'Text2' },
        ],
      },
      {
        id: '1',
        name: 'Column 2',
        items: [
          { id: '2', description: 'Text3' },
          { id: '3', description: 'Text4' },
        ],
      },
      {
        id: '2',
        name: 'Column 3',
        items: [
          { id: '4', description: 'Text5' },
          { id: '5', description: 'Text6' },
        ],
      },
    ],
  };

  let columns = [];

  for (let i = 0; i < boardData.data.length; i++) {
    const currentColumn = boardData.data[i];

    let items = [];

    for (let j = 0; j < currentColumn.items.length; j++) {
      const currentItem = currentColumn.items[j];

      const item = new Item({ description: currentItem.description });

      item.save();

      items.push(item._id);
    }

    const column = new Column({ name: currentColumn.name, items });

    column.save();

    columns.push(column._id);
  }

  const board = new Board({ name: 'Board', data: columns });

  board.save();
};

(async () => {
  await mongoose.connect('mongodb://localhost:27017/vrello?retryWrites=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // addBoard();
})();

// Routes
// app.use(creditCardRouter);

io.on('connection', socket => {
  console.log('New client connected...', socket.id);

  Board.findOne({})
    .populate({
      path: 'data',
      populate: {
        path: 'items',
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

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
