module.exports = socket => {
  socket.emit('connected');

  socket.on('join', require('./listeners/join.listener')(socket));
  socket.on('boardChange', require('./listeners/boardChange.listener')(socket));
};
