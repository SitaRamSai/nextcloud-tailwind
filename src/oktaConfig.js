// src/oktaConfig.js
export default {
    clientId: '0oadaxbgy1TUFwHrh1d7',
    issuer: 'https://aw.oktapreview.com/oauth2/ausdaxavwpiCUOhQG1d7',
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true
  };
  