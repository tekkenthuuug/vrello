import { API_ROUTES } from '../../utils/constants';

const postUserBoards = async newBoard => {
  const response = await fetch(API_ROUTES.board.create(), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newBoard),
  });

  return await response.json();
};

export default postUserBoards;
