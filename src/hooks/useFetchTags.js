import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchTags = (searchTerm) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setLoading(true);
      const fetchTags = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/search-tags?tagName=${searchTerm}`);
          setTags(response.data);
        } catch (error) {
          console.error('Failed to fetch tags:', error);
        } finally {
          setLoading(false);
        }
      };

      const timerId = setTimeout(fetchTags, 500); // Debounce the search
      return () => clearTimeout(timerId);
    } else {
      setTags([]);
    }
  }, [searchTerm]);

  return { tags, loading };
};

export default useFetchTags;
