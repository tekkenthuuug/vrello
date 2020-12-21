const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const Board = require('./src/models/Board.model');

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

(async () => {
  await mongoose.connect('mongodb://localhost:27017/vrello', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();

// Routes
// app.use(creditCardRouter);
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

io.on('connection', socket => {
  console.log('New client connected...', socket.id);

  socket.emit('connected', boardData);

  socket.on('join', room => {
    socket.join(room);
  });

  socket.on('board-change', data => {
    // TODO: handle updating DB
    switch (data.action.type) {
      case 'ADD_CARD':
      case 'ADD_COLUMN': {
        // temp
        data.action.payload.item.id = Date.now() + '';
      }
      case 'ADD_COLUMN': {
        // temp
        data.action.payload.item.items = [];
      }
    }

    // send to users in this room
    io.to(data.room).emit('board-change', data.action);
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
