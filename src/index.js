import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './hooks/useTheme';
import App from './app/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);