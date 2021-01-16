import React from 'react';
import {
  NoBoardAccessContainer,
  MessageContainer,
  RequestAccessBtn,
  Separator,
  HomeLink,
  OptionsContainer,
} from './no-board-access.styles';
import { ReactComponent as RestrictedIllustration } from '../../assets/pending_approval.svg';
import { useSelector } from 'react-redux';
import { selectBoardId } from '../../redux/board/board.selectors';
import useFetch from '../../hooks/useFetch';
import { API_ROUTES } from '../../utils/constants';
import { useHistory } from 'react-router-dom';

const NoBoardAccess = () => {
  const history = useHistory();
  const boardId = useSelector(selectBoardId);

  const [sendRequest, { isLoading }] = useFetch(
    API_ROUTES.board.requestAccess(boardId),
    { method: 'POST' }
  );

  const handleRequestAccessClick = async () => {
    const response = await sendRequest();

    if (response.success) {
      // TODO: toast notification
      history.push('/app');
    }
  };

  return (
    <NoBoardAccessContainer>
      <RestrictedIllustration />
      <MessageContainer>
        <h1>Ooops... It seems like there is a problem</h1>
        <h2>Your don't have access to this board</h2>
        <OptionsContainer>
          {boardId && (
            <>
              <RequestAccessBtn
                onClick={handleRequestAccessClick}
                disabled={!isLoading}
              >
                Request access
              </RequestAccessBtn>
              <Separator>Or</Separator>
            </>
          )}
          <HomeLink to='/app'>Go home</HomeLink>
        </OptionsContainer>
      </MessageContainer>
    </NoBoardAccessContainer>
  );
};

export default NoBoardAccess;
