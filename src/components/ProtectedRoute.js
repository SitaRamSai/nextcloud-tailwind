// src/components/ProtectedRoute.js
import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading...</div>;
  } else if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
