import { Form } from 'formik';
import styled from 'styled-components';
import InputField from '../input-field/input-field';
import UserProfileCard from '../user-profile-card/user-profile-card';

export const StyledForm = styled(Form)`
  width: 400px;
`;

export const UsersDropdown = styled.div`
  position: absolute;
  top: 43px;
  width: 100%;
  border: 2px solid #dfe1e6;
  background-color: #fff;
  z-index: 10;
`;

export const StyledInputField = styled(InputField)`
  position: relative;
`;

export const StyledUserProfileCard = styled(UserProfileCard)`
  cursor: pointer !important;
  padding: 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

export const SelectedUserCard = styled(UserProfileCard)`
  padding: 12px !important;

  background-color: rgba(0, 0, 0, 0.02);

  border: 1px solid #dfe1e6;

  margin-bottom: 1.2em;
`;
