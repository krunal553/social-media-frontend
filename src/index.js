import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { DarkModeContextProvider } from './context/darkModeContext';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);