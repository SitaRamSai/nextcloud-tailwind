import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';
import AdvancedSearch from '../components/Search/AdvancedSearch';
import FileList from '../components/Search/FileList';
import { fetchFilesByTag, searchFiles } from '../utils/api';
import axios from 'axios';

const SearchFiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fileDetails, setFileDetails] = useState([]);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchConditions, setSearchConditions] = useState([]);
  const [logicalOperator, setLogicalOperator] = useState('AND');
  const [isToggleOn, setIsToggleOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 0 && !advancedSearch) {
      const fetchTags = async () => {
        try {
          const files = await fetchFilesByTag(searchTerm);
          setFileDetails(files);
        } catch (error) {
          console.error('Failed to fetch files:', error);
        }
      };

      const timerId = setTimeout(fetchTags, 500); // Debounce the search
      return () => clearTimeout(timerId);
    }
  }, [searchTerm, advancedSearch]);

  const handleTagClick = async (tag) => {
    setSearchTerm(tag.tagName);
    setAdvancedSearch(false);

    try {
      const files = await fetchFilesByTag(tag.tagName);
      setFileDetails(files);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const addSearchCondition = () => {
    setSearchConditions([...searchConditions, { fieldName: '', operation: 'equals', searchValue: '' }]);
  };

  const updateSearchCondition = (index, field, value) => {
    const newConditions = searchConditions.map((condition, i) => {
      if (i === index) {
        return { ...condition, [field]: value };
      }
      return condition;
    });
    setSearchConditions(newConditions);
  };

  const toggleLogicalOperator = () => {
    setIsToggleOn(!isToggleOn);
    setLogicalOperator(!isToggleOn ? 'OR' : 'AND');
  };

  const toggleAdvancedSearch = () => {
    setAdvancedSearch(!advancedSearch);
    if (!advancedSearch) {
      setSearchConditions([{ fieldName: '', operation: 'equals', searchValue: '' }]);
    } else {
      setSearchConditions([]);
    }
  };

  const handleAdvancedSearch = async () => {
    const fieldMappings = {
      "Policy Number": "policyNumber",
      "Insured Name": "insuredName",
      "UW Name": "uwName",
      "LOB": "lob",
      "Broker Company": "brokerCompany"
    };

    const operationMappings = {
      "Equals": "equals",
      "Contains": "contains"
    };

    const requestData = {
      [logicalOperator]: searchConditions.map(condition => ({
        fieldName: fieldMappings[condition.fieldName] || condition.fieldName,
        searchValue: condition.searchValue,
        operation: operationMappings[condition.operation.toLowerCase()] || condition.operation.toLowerCase()
      }))
    };
  
    try {
      const response = await axios.post('https://ibzok4z239.execute-api.us-east-1.amazonaws.com/test/nextcloud/files', requestData);
      console.log('Search results:', response.data);
      const filesWithDetails = response.data.files.map(file => ({
        ...file,
        policyNumber: file.allTags.find(tag => tag.policyNumber)?.policyNumber || 'N/A',
        insuredName: file.allTags.find(tag => tag.insuredName)?.insuredName || 'N/A',
        uwName: file.allTags.find(tag => tag.uwName)?.uwName || 'N/A',
        lob: file.allTags.find(tag => tag.lob)?.lob || 'N/A',
        brokerCompany: file.allTags.find(tag => tag.brokerCompany)?.brokerCompany || 'N/A',
        file_name: file.file_name || 'No filename provided'
      }));
      setFileDetails(filesWithDetails);
    } catch (error) {
      console.error('Failed to execute search:', error);
    }
  };

  const handlePolicyClick = (policyNumber) => {
    navigate(`/policy_details/${policyNumber}`);
  };

  const handleDownload = (fileName) => {
    window.location.href = `https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/download/${fileName}`;
  };

  const handleDownloadFromS3WithPresignedUrl = async (fileName) => {
    try {
      const response = await axios.get(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/generate-presigned-url/${fileName}`);
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Failed to get a valid response from the server');
      }
    } catch (error) {
      console.error('Error downloading file from S3:', error);
      alert('Failed to download file from S3. Please check the console for more details.');
    }
  };

  const handleDelete = async (fileName, fileIndex) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${fileName}?`);
    if (isConfirmed) {
      try {
        await axios.delete(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/delete-file/${fileName}`);
        await axios.delete('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/delete-file-details', {
          data: {
            fieldName: "fileNames",
            fileNames: [fileName]
          }
        });
        alert(`File '${fileName}' deleted successfully.`);
        setFileDetails(fileDetails.filter((_, index) => index !== fileIndex));
      } catch (error) {
        console.error('Error:', error);
        alert(`Error deleting file '${fileName}': ${error.message}`);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Policy Files</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onTagClick={handleTagClick} />
      </div>
      <div className="w-full max-w-2xl mx-auto mb-6 flex justify-between">
        <button
          className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600"
          onClick={toggleAdvancedSearch}
          aria-label="Advanced search button"
        >
          Advanced Search
        </button>
      </div>
      {advancedSearch && (
        <AdvancedSearch
          searchConditions={searchConditions}
          addSearchCondition={addSearchCondition}
          updateSearchCondition={updateSearchCondition}
          removeSearchCondition={(index) => setSearchConditions(searchConditions.filter((_, i) => i !== index))}
          logicalOperator={logicalOperator}
          toggleLogicalOperator={toggleLogicalOperator}
          handleSearch={handleAdvancedSearch}
        />
      )}
      {fileDetails.length > 0 && (
        <FileList
          fileDetails={fileDetails}
          handleDownload={handleDownload}
          handleDownloadFromS3WithPresignedUrl={handleDownloadFromS3WithPresignedUrl}
          handleDelete={handleDelete}
          handlePolicyClick={handlePolicyClick}
        />
      )}
    </div>
  );
};

export default SearchFiles;
