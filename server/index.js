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

io.on('connection', socket => {
  console.log('New client connected...', socket);
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
