const requireAuth = (socket, next) => {
  if (!socket.request.session.userId) {
    socket.emit('unauthorized');
    return socket.disconnect();
  }

  return next();
};

module.exports = requireAuth;
