import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { AiOutlineDelete } from 'react-icons/ai';

const Navbar = ({ setCorsErrorModalOpen }) => {
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (err) {
      if (err.name === 'AuthApiError' && !err.errorCode && err.xhr.message === 'Failed to fetch') {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  };

  const handleHomeClick = () => {
    if (authState?.isAuthenticated) {
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <button onClick={handleHomeClick} className="focus:outline-none">
            UW Lite
          </button>
        </div>
        <div className="space-x-4 flex items-center">
          <button
            onClick={handleHomeClick}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300"
          >
            Home
          </button>
          {authState?.isAuthenticated && (
            <>
              <Link to="/policy-dashboard" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300">
                Dashboard
              </Link>
              <Link to="/search-files" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300">
                Search
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow transition duration-300"
              >
                Logout
              </button>
            </>
          )}
          {!authState?.isAuthenticated && (
            <button
              onClick={handleLogin}
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
