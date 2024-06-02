// src/oktaConfig.js
export default {
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
  