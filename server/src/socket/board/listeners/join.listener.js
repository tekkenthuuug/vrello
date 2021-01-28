const Board = require('../../../models/Board.model');
const User = require('../../../models/User.model');

module.exports = socket => async ({ boardSlug, creatorSlug }) => {
  // find board
  const creator = await User.findOne({
    slug: creatorSlug,
  }).select({ slug: 1, username: 1 });

  const board = await Board.findOne({
    slug: boardSlug,
    creator: creator._id,
  });

  // check if user has access to this board
  const { session } = socket.request;

  const isOwner = board.hasAdmin(session.userId);

  const hasAccess = isOwner || board.members.includes(session.userId);

  if (hasAccess) {
    const boardData = await board.populateFullBoard();

    boardData.creator = creator;

    socket.emit('joined', boardData);

    socket.join(String(board._id));
  } else {
    socket.emit('noAccess', board._id);
  }
};
