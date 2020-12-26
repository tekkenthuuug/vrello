export const ROUTES = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  app: {
    index: '/app',
    board: '/app/board',
  },
};

const API_BASE_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  auth: {
    signin: () => `${API_BASE_URL}/auth/signin`,
    signup: () => `${API_BASE_URL}/auth/signup`,
    me: () => `${API_BASE_URL}/auth/me`,
  },
  user: {
    boards: uid => `${API_BASE_URL}/user/${uid}/boards`,
  },
};
