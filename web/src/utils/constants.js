export const ROUTES = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  board: '/board',
  menu: '/menu',
};

const API_BASE_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  signup: `${API_BASE_URL}/auth/signup`,
  signin: `${API_BASE_URL}/auth/signin`,
};
