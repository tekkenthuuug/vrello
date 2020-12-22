import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Nunito', sans-serif;
}
button, textarea, input {
  outline: none;
  border: none;
  font-family: inherit;
}
button {
  cursor: pointer;
}
a {
  text-decoration: none;
  color: #0052CC;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
`;

export default GlobalStyles;
