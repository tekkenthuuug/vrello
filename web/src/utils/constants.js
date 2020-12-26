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
    signIn: () => `${API_BASE_URL}/auth/signin`,
    signUp: () => `${API_BASE_URL}/auth/signup`,
    signOut: () => `${API_BASE_URL}/auth/signout`,
    me: () => `${API_BASE_URL}/auth/me`,
  },
  user: {
    boards: uid => `${API_BASE_URL}/user/${uid}/boards`,
  },
  board: {
    create: () => `${API_BASE_URL}/board/create`,
  },
};
