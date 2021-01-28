import React from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as RestrictedIllustration } from '../../assets/pending_approval.svg';
import postRequestBoardAccess from '../../react-query/mutations/postRequestBoardAccess';
import { selectBoardId } from '../../redux/board/board.selectors';
import {
  HomeLink,
  MessageContainer,
  NoBoardAccessContainer,
  OptionsContainer,
  RequestAccessBtn,
  Separator,
} from './no-board-access.styles';

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
        <h2>You don't have access to this board</h2>
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
