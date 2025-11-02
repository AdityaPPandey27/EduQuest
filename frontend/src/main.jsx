import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeContext'; // NEW IMPORT

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Wrap the entire application with ThemeProvider */}
      <ThemeProvider>
        <Router> {/* Assuming router wrapping here */}
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);