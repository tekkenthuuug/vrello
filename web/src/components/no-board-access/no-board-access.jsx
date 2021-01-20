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
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import postRequestBoardAccess from '../../react-query/mutations/postRequestBoardAccess';

const NoBoardAccess = () => {
  const history = useHistory();
  const boardId = useSelector(selectBoardId);

  const sendRequestMutation = useMutation(postRequestBoardAccess, {
    onSuccess: () => {
      toast.success('Your access request was sent to the owner of the board.');
      history.push('/app');
    },
  });

  const handleRequestAccessClick = () => {
    sendRequestMutation.mutate(boardId);
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
                disabled={sendRequestMutation.isLoading}
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
