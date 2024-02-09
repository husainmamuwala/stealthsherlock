import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import theme from './theme';
import store from './store/store';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router >
        <React.StrictMode>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </React.StrictMode>
      </Router>
    </Provider>
  </ThemeProvider>
  ,
  document.getElementById('root')
);

serviceWorker.register();
