const socket = require('socket.io');

const expressMiddlewareWrapper = require('./middleware/expressMiddlewareWrapper');
const requireAuth = require('./middleware/requireAuth');

const initializeSocket = (server, expressSessionMiddleware) => {
  // Socket setup
  const io = socket(server);

  const boardsNamespace = io.of('/boards');

  // Namespaces middleware
  boardsNamespace.use(expressMiddlewareWrapper(expressSessionMiddleware));
  boardsNamespace.use(requireAuth);

  // Namespaces listeners initialization
  boardsNamespace.on('connection', require('./board'));
};

module.exports = initializeSocket;
