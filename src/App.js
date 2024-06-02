// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PolicyDashboard from './pages/PolicyDashboard';
import SearchFiles from './pages/SearchFiles';
import AddPolicy from './pages/AddPolicy';
import PolicyDetails from './pages/PolicyDetails';
import DeleteTags from './pages/DeleteTags'; // Import DeleteTags component
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policy-dashboard" element={<PolicyDashboard />} />
        <Route path="/search-files" element={<SearchFiles />} />
        <Route path="/add-policy" element={<AddPolicy />} />
        <Route path="/policy-details/:policyNumber" element={<PolicyDetails />} />
        <Route path="/delete-tags" element={<DeleteTags />} /> {/* Add route for DeleteTags */}
      </Routes>
    </div>
  );
};

export default App;
