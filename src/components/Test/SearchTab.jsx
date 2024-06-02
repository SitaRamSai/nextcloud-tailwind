import React, { useState } from 'react';
import PolicySearch from './PolicySearch';
import PolicyCard from './PolicyCard';

const SearchTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [policies, setPolicies] = useState([]); // Example data, replace with actual data

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePolicySelection = (policyNumber) => {
    console.log(`Selected policy: ${policyNumber}`); // Replace with actual navigation
  };

  const filteredPolicies = policies.filter((policy) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      policy.policyNumber.toLowerCase().includes(searchTermLower) ||
      policy.insuredName.toLowerCase().includes(searchTermLower) ||
      policy.uwName.toLowerCase().includes(searchTermLower) ||
      new Date(policy.policyStartDate).toLocaleDateString().includes(searchTermLower) ||
      new Date(policy.policyExpirationDate).toLocaleDateString().includes(searchTermLower)
    );
  });

  return (
    <div>
      <PolicySearch searchTerm={searchTerm} onSearchChange={handleSearchChange} onClearSearch={() => setSearchTerm('')} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredPolicies.length === 0 ? (
          <div className="text-center text-gray-600 col-span-full">No policies found. Try adjusting your search term.</div>
        ) : (
          filteredPolicies.map((policy, index) => (
            <PolicyCard key={index} policy={policy} onSelect={handlePolicySelection} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchTab;
