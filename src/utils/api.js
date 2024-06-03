import axios from 'axios';


export const createTag = async (tagName) => {
  try {
    const response = await axios.post('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/create-tag', { tagName }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

export const getTagId = async (tagName) => {
  try {
    const response = await axios.get(`https://ibzok4z239.execute-api.us-east-1.amazonaws.com/test/nextcloud/tags?tagName=${tagName}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data.tags[0].tagId;
  } catch (error) {
    console.error('Error getting tag ID:', error);
    throw error;
  }
};

export const assignTagToFiles = async (fileIds, tagId) => {
  try {
    const response = await axios.put('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/assign-tag', {
      fileIds,
      tagId
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning tag to files:', error);
    throw error;
  }
};

export const fetchTags = async (searchTerm) => {
  try {
    const response = await axios.get(`https://ibzok4z239.execute-api.us-east-1.amazonaws.com/test/nextcloud/tags?tagName=${searchTerm}`);
    if (response.data.statusCode === 200) {
      return response.data.tags;
    } else {
      console.error('Failed to fetch tags, status code:', response.data.statusCode);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
};

export const fetchFilesByTag = async (tagName) => {
  try {
    const response = await axios.get(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/get-files-by-tag?tagName=${tagName}`);
    return response.data.map(file => ({
      ...file,
      policyNumber: file.allTags.find(tag => tag.policyNumber)?.policyNumber || 'N/A',
      insuredName: file.allTags.find(tag => tag.insuredName)?.insuredName || 'N/A',
      uwName: file.allTags.find(tag => tag.uwName)?.uwName || 'N/A',
      lob: file.allTags.find(tag => tag.lob)?.lob || 'N/A',
      brokerCompany: file.allTags.find(tag => tag.brokerCompany)?.brokerCompany || 'N/A',
    }));
  } catch (error) {
    console.error('Failed to fetch files:', error);
    return [];
  }
};

export const searchFiles = async (searchConditions, logicalOperator) => {
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
    return response.data.files.map(file => ({
      ...file,
      policyNumber: file.allTags.find(tag => tag.policyNumber)?.policyNumber || 'N/A',
      insuredName: file.allTags.find(tag => tag.insuredName)?.insuredName || 'N/A',
      uwName: file.allTags.find(tag => tag.uwName)?.uwName || 'N/A',
      lob: file.allTags.find(tag => tag.lob)?.lob || 'N/A',
      brokerCompany: file.allTags.find(tag => tag.brokerCompany)?.brokerCompany || 'N/A',
      file_name: file.file_name || 'No filename provided'
    }));
  } catch (error) {
    console.error('Failed to execute search:', error);
    return [];
  }
};

// src/utils/api.js

export const fetchPolicyDetails = async (policyNumber) => {
  const response = await fetch(`https://gzqd4dt6i7.execute-api.us-east-1.amazonaws.com/test/api/v1/policy/${policyNumber}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.body;
};

export const fetchPresignedUrl = async (fileName) => {
  const response = await fetch(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/generate-presigned-url/${fileName}`);
  const data = await response.json();
  if (!response.ok || !data.url) {
    throw new Error('Failed to get a valid response from the server');
  }
  return data.url;
};

export const deleteFile = async (fileName) => {
  const response = await fetch(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/delete-file/${fileName}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Server response wasn’t OK when attempting to delete the file.');

  const deleteDetailsResponse = await fetch(`https://gzqd4dt6i7.execute-api.us-east-1.amazonaws.com/test/api/v1/files`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fieldName: "fileNames",
      fileNames: [fileName]
    })
  });

  if (!deleteDetailsResponse.ok) {
    throw new Error('Failed to delete file details from the server');
  }
};

export const fetchPolicies = async () => {
  const response = await fetch('https://gzqd4dt6i7.execute-api.us-east-1.amazonaws.com/test/api/v1/policies');
  if (!response.ok) {
    throw new Error('Failed to fetch policies');
  }
  const data = await response.json();
  return data.body;
};

export const fetchTagsAPI = async () => {
  try {
    const response = await fetch('http://localhost:3001/tags');
    const data = await response.json();
    return data.filter(tag => tag.id && tag.name).map(tag => ({
      id: tag.id,
      name: tag.name
    }));
  } catch (error) {
    console.log('Error fetching tags:', error);
    return [];
  }
};

export const uploadFiles = async (files) => {
  const formDataToSend = new FormData();
  files.forEach(fileObj => {
    formDataToSend.append('files', fileObj.file);
  });

  const response = await fetch('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/upload-files', {
    method: 'POST',
    body: formDataToSend,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};

export const submitPolicyData = async (policyData) => {
  const response = await fetch('https://gzqd4dt6i7.execute-api.us-east-1.amazonaws.com/test/api/v1/policy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(policyData)
  });

  if (!response.ok) {
    throw new Error('Failed to update policy data');
  }

  return response.json();
};

// Function to fetch tags from the API
export const fetchTagsForDelete = async () => {
  try {
    const response = await axios.get('https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/fetch-all-tags');
    return response.data.sort((a, b) => a.name.localeCompare(b.name)); // Sort tags alphabetically
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

// Function to delete a specific tag
export const deleteTag = async (id) => {
  try {
    await axios.delete(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/delete-tags/${id}`, {
      headers: {
        'x-api-key': process.env.REACT_APP_AWS_API_GATEWAY_DELETE_API_KEY // Use REACT_APP_ prefix
      }
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};

// Function to delete all tags
export const deleteAllTags = async (tags) => {
  const headers = {
    'x-api-key': process.env.REACT_APP_AWS_API_GATEWAY_DELETE_API_KEY // Use REACT_APP_ prefix
  };

  const errors = [];

  for (let tag of tags) {
    try {
      await axios.delete(`https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/tags/delete-tags/${tag.id}`, { headers });
    } catch (error) {
      console.error(`Error deleting tag ${tag.id}:`, error);
      errors.push(error);
    }
  }

  if (errors.length > 0) {
    throw new Error('Some tags could not be deleted');
  }
};