import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import {BrowserRouter as Router} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);


