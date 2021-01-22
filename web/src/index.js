import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { UserProvider } from './contexts/userContext';
import store from './redux/store';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import createQueryClient from './utils/createQueryClient';
import GlobalStyles from './GlobalStyles';

const queryClient = createQueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools /> {/* excluded in production mode */}
    <GlobalStyles />
    <Provider store={store}>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
);
