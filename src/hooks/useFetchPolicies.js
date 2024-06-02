// src/hooks/useFetchPolicies.js

import { useState, useEffect } from 'react';
import { fetchPolicies } from '../utils/api';

const useFetchPolicies = () => {
  const [formDataArray, setFormDataArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const policies = await fetchPolicies();
        setFormDataArray(policies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { formDataArray, loading, error };
};

export default useFetchPolicies;
