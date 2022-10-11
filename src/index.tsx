import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import Layout from './components/layout';
import store from './redux/store';
import reportWebVitals from './report-web-vitals';
import { themes } from './themes';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes}>
          <Layout />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
