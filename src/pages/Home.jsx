// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai';
import { BsFillFileEarmarkPlusFill } from 'react-icons/bs';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-white via-gray-100 to-white">
      {/* Hero Section */}
      <header className="container mx-auto text-center py-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Hello, Welcome to UW Lite App!</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate('/policy-dashboard')}
          >
            <AiOutlineDashboard className="text-6xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Policy Dashboard</h2>
            <p className="text-gray-600">View and manage policies.</p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate('/search-files')}
          >
            <AiOutlineSearch className="text-6xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Search Files</h2>
            <p className="text-gray-600">Search for files in the system.</p>
          </div>
          <div
            className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1"
            onClick={() => navigate('/add-policy')}
          >
            <BsFillFileEarmarkPlusFill className="text-6xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Add Policy</h2>
            <p className="text-gray-600">Create a new policy.</p>
          </div>
        </div>
      </main>

      {/* Recycle Bin Icon */}
      <div
        className="fixed bottom-4 right-4 bg-white shadow-md rounded-full p-3 cursor-pointer hover:bg-gray-200"
        onClick={() => navigate('/delete-tags')}
      >
        <AiOutlineDelete className="text-xl text-red-500" />
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md p-4">
        <div className="container mx-auto text-center text-gray-600">
          © 2024 MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
