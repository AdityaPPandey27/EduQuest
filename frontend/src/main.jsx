// EduQuest/frontend/src/main.jsx (UPDATED)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap the App component with the Redux Provider */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
