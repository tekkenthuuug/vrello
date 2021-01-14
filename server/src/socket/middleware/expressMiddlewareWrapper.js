const expressMiddlewareWrapper = middleware => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = expressMiddlewareWrapper;
