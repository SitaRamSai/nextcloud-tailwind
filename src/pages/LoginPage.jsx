// src/pages/LoginPage.jsx
import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

const LoginPage = () => {
  const { oktaAuth } = useOktaAuth();

  useEffect(() => {
    oktaAuth.signInWithRedirect();
  }, [oktaAuth]);

  return <div>Redirecting to login...</div>;
};

export default LoginPage;
