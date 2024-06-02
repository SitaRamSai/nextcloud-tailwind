// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PolicyDashboard from './pages/PolicyDashboard';
import SearchFiles from './pages/SearchFiles';
import AddPolicy from './pages/AddPolicy';
import PolicyDetails from './pages/PolicyDetails';
import DeleteTags from './pages/DeleteTags';
import Navbar from './components/Navbar';
import { LoginCallback } from '@okta/okta-react';
import Login from './pages/Login'; // Import Login component
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/policy-dashboard" element={<ProtectedRoute element={PolicyDashboard} />} />
          <Route path="/search-files" element={<ProtectedRoute element={SearchFiles} />} />
          <Route path="/add-policy" element={<ProtectedRoute element={AddPolicy} />} />
          <Route path="/policy-details/:policyNumber" element={<ProtectedRoute element={PolicyDetails} />} />
          <Route path="/delete-tags" element={<ProtectedRoute element={DeleteTags} />} />
        </Routes>
      </main>
      <footer className="mt-auto">
        {/* Footer Content */}
      </footer>
    </div>
  );
};

export default App;
