module.exports = socket => {
  socket.emit('connected');

  socket.on('join', require('./listeners/join.listener')(socket));
  socket.on(
    'adminBoardChange',
    require('./listeners/adminBoardChange.listener')(socket)
  );
  socket.on(
    'memberBoardChange',
    require('./listeners/memberBoardChange.listener')(socket)
  );
};
