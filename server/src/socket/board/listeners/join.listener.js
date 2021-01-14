const Board = require('../../../models/Board.model');
const User = require('../../../models/User.model');

module.exports = socket => async ({ boardSlug, creatorSlug }) => {
  // find board
  const { id: creatorId } = await User.findOne({
    slug: creatorSlug,
  }).select({ _id: 1 });

  const board = await Board.findOne({
    slug: boardSlug,
    creator: creatorId,
  });

  // check if user has access to this board
  const { session } = socket.request;

  const hasAccess =
    String(board.creator) === session.userId ||
    board.members.includes(session.userId);

  if (hasAccess) {
    const boardData = await board.populateData();

    socket.emit('joined', boardData);

    socket.join(board._id);
  } else {
    socket.emit('no-access');
  }
};
