// SearchContext.js
import React, { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [conditions, setConditions] = useState([{ field: 'policyNumber', condition: 'equals', value: '' }]);
  const [submittedConditions, setSubmittedConditions] = useState([]);
  const [logicalOperator, setLogicalOperator] = useState('AND');
  const [tags, setTags] = useState([]);
  const [fileDetails, setFileDetails] = useState([]);

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('searchState'));
    if (savedState) {
      setSearchTerm(savedState.searchTerm || '');
      setConditions(savedState.conditions || [{ field: 'policyNumber', condition: 'equals', value: '' }]);
      setSubmittedConditions(savedState.submittedConditions || []);
      setLogicalOperator(savedState.logicalOperator || 'AND');
      setTags(savedState.tags || []);
      setFileDetails(savedState.fileDetails || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'searchState',
      JSON.stringify({ searchTerm, conditions, submittedConditions, logicalOperator, tags, fileDetails })
    );
  }, [searchTerm, conditions, submittedConditions, logicalOperator, tags, fileDetails]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        conditions,
        setConditions,
        submittedConditions,
        setSubmittedConditions,
        logicalOperator,
        setLogicalOperator,
        tags,
        setTags,
        fileDetails,
        setFileDetails
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
