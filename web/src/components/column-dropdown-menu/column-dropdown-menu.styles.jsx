import styled from 'styled-components';

import { DropdownContainer } from '../../shared-styles/dropdown.styles';

export const StyledDropdownContainer = styled(DropdownContainer)`
  width: 100%;

  @keyframes slideInDropdown {
    from {
      transform: translateY(-120px);
      opacity: 0;
    }
    to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  animation: slideInDropdown 0.2s ease;
`;
