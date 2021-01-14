const socket = require('socket.io');

const IOMiddlewareWrapper = require('../middleware/IOMiddlewareWrapper');

const Board = require('../models/Board.model');
const BoardMember = require('../models/BoardMember.model');
const User = require('../models/User.model');

const initializeSocket = (server, expressSessionMiddleware) => {
  // Socket setup
  const io = socket(server);

  const namespace = {
    boards: io.of('/boards'),
  };

  // Socket middleware
  namespace.boards.use(IOMiddlewareWrapper(expressSessionMiddleware));

  namespace.boards.on('connection', socket => {
    socket.emit('connected');

    socket.on('join', async ({ boardSlug, creatorSlug }) => {
      // find board
      const { id: creatorId } = await User.findOne(
        { slug: creatorSlug },
        '_id'
      );
      const board = await Board.findOne({
        slug: boardSlug,
        creator: creatorId,
      });

      // check if user has access to this board
      const { session } = socket.request;

      const boardMembership = await BoardMember.findOne({
        board: board._id,
        member: session.userId,
      });

      if (String(board.creator) === session.userId || boardMembership) {
        const populatedBoard = await board
          .populate({
            path: 'columns',
            populate: {
              path: 'cards',
            },
          })
          .execPopulate();

        socket.emit('joined', populatedBoard);

        socket.join(board.boardId);
      } else {
        socket.emit('no-access');
      }
    });

    socket.on(
      'board-change',
      require('../utils/handleBoardChangeEvent')(socket)
    );
  });
};

module.exports = initializeSocket;
