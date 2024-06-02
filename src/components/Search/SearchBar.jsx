import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';

// Debounce function to limit the number of API calls
const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = ({ searchTerm, setSearchTerm, onTagClick }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestionClicked, setSuggestionClicked] = useState(false);
  const loadingTimerRef = useRef(null);

  const handleSearch = async (term) => {
    if (term.length > 0 && !suggestionClicked) {
      setError(null);
      // Start a timer to show the loading indicator only if the fetch takes longer than 300ms
      loadingTimerRef.current = setTimeout(() => setLoading(true), 300);
      try {
        const response = await axios.get(`https://ibzok4z239.execute-api.us-east-1.amazonaws.com/test/nextcloud/tags?tagName=${term}`);
        if (response.data.statusCode === 200) {
          setTags(response.data.tags);
        } else {
          console.error('Failed to fetch tags, status code:', response.data.statusCode);
          setTags([]);
        }
      } catch (err) {
        console.error('Failed to fetch tags:', err);
        setError('Failed to fetch tags. Please try again later.');
        setTags([]);
      } finally {
        clearTimeout(loadingTimerRef.current);
        setLoading(false);
      }
    } else {
      setTags([]);
      setSuggestionClicked(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const getDisplayTag = (tag) => {
    const parts = tag.tagName.split('_');
    return parts.length > 1 ? parts.slice(1).join('_') : tag.tagName;
  };

  const clearSearch = () => {
    setSearchTerm('');
    setTags([]);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="relative flex items-center">
        <FiSearch className="absolute left-3 text-gray-400" />
        <input
          type="text"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out"
          placeholder="Search policies, files, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search input"
        />
        {searchTerm && (
          <FiX
            className="absolute right-3 text-gray-400 cursor-pointer"
            onClick={clearSearch}
            aria-label="Clear search input"
          />
        )}
      </div>
      {loading && <div className="text-center mt-2">Loading...</div>}
      {error && <div className="text-center mt-2 text-red-500">{error}</div>}
      {tags.length > 0 && (
        <div className="bg-white border border-gray-300 mt-4 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {tags.map(tag => (
            <div
              key={tag.tagId}
              className="p-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center border-b"
              onClick={() => onTagClick(tag)}
              title={tag.tagName} // Tooltip with full tag value
            >
              <div>
                <span className="font-bold">{getDisplayTag(tag)}</span>
                <span className="text-gray-500 ml-2">{tag.policyNumber}</span>
              </div>
              <FiSearch className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
