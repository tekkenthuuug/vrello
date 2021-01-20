export const DEFAULT_TOAST_PROPS = {
  position: 'top-right',
  autoClose: 7500,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: false,
  pauseOnHover: true,
};

export const BOARD_COLORS = [
  '#0079bf',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91',
];

const API_BASE_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  user: {
    boards: uid => `${API_BASE_URL}/users/${uid}/boards`,
    search: email => `${API_BASE_URL}/users/search?email=${email}`,
  },
  board: {
    create: () => `${API_BASE_URL}/board/create`,
    addMember: boardId => `${API_BASE_URL}/board/${boardId}/add-member`,
    requestAccess: boardId => `${API_BASE_URL}/board/${boardId}/request-access`,
  },
};
