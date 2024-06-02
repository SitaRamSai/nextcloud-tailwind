import React, { useEffect, useState } from 'react';
import PolicyCard from './PolicyCard';

const PolicyListTab = () => {
  const [policies, setPolicies] = useState([]); // Example data, replace with actual data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch policies from API
    const fetchPolicies = async () => {
      try {
        const response = await fetch('https://api.example.com/policies');
        const data = await response.json();
        setPolicies(data);
      } catch (error) {
        console.error('Failed to fetch policies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handlePolicySelection = (policyNumber) => {
    console.log(`Selected policy: ${policyNumber}`); // Replace with actual navigation
  };

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {policies.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full">No policies found.</div>
          ) : (
            policies.map((policy, index) => (
              <PolicyCard key={index} policy={policy} onSelect={handlePolicySelection} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyListTab;
