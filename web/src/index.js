import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { UserProvider } from './contexts/userContext';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </Provider>,
  document.getElementById('root')
);
