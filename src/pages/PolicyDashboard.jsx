// src/pages/PolicyDashboard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetchPolicies from '../hooks/useFetchPolicies';
import PolicySummary from '../components/Dashboard/PolicySummary';
import PolicySearch from '../components/Dashboard/PolicySearch';
import PolicyCard from '../components/Dashboard/PolicyCard';



const PolicyDashboard = () => {
  const navigate = useNavigate();
  const { formDataArray, loading, error } = useFetchPolicies();
  const [searchTerm, setSearchTerm] = useState('');

  const handlePolicySelection = (policyNumber) => {
    navigate(`/policy-details/${policyNumber}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredPolicies = formDataArray.filter((policy) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      policy.policyNumber.toLowerCase().includes(searchTermLower) ||
      policy.insuredName.toLowerCase().includes(searchTermLower) ||
      policy.uwName.toLowerCase().includes(searchTermLower) ||
      new Date(policy.policyStartDate).toLocaleDateString().includes(searchTermLower) ||
      new Date(policy.policyExpirationDate).toLocaleDateString().includes(searchTermLower)
    );
  });

  const totalPolicies = formDataArray.length;
  const activePolicies = formDataArray.filter(policy => new Date(policy.policyExpirationDate) > new Date()).length;
  const expiredPolicies = totalPolicies - activePolicies;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <PolicySummary
        totalPolicies={totalPolicies}
        activePolicies={activePolicies}
        expiredPolicies={expiredPolicies}
      />
      <div className="mt-6">
        <PolicySearch searchTerm={searchTerm} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} />
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader">Loading...</div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            Failed to load policies. Please try again later.
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="text-center text-gray-600">No policies found. Try adjusting your search term.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredPolicies.map((policy, index) => (
              <PolicyCard
                key={index}
                policy={policy}
                onSelect={handlePolicySelection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDashboard;
