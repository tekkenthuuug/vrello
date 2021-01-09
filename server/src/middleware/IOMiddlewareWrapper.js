const IOMiddlewareWrapper = middleware => (socket, next) =>
  middleware(socket.request, {}, next);

module.exports = IOMiddlewareWrapper;
