// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js'; // Correct import
import App from './App';
import oktaConfig from './oktaConfig';
import './index.css'; // Import Tailwind CSS

const oktaAuth = new OktaAuth(oktaConfig);

const AppWithRouter = () => {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || '/');
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <App />
    </Security>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>,
  document.getElementById('root')
);
