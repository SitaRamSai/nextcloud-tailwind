import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">
            UW Lite
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300">
            Home
          </Link>
          <Link to="/policy-dashboard" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300">
            Dashboard
          </Link>
          <Link to="/search-files" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded shadow transition duration-300">
            Search
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
