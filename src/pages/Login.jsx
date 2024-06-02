// src/pages/Login.js
import React from 'react';
import { withOktaAuth } from '@okta/okta-react';

const Login = ({ oktaAuth }) => {
  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold">Hello, Welcome to UW Lite!</h1>
      <button onClick={login} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Login with Okta
      </button>
    </div>
  );
};

export default withOktaAuth(Login);
