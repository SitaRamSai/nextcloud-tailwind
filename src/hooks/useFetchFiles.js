import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchFiles = (requestData, logicalOperator) => {
  const [fileDetails, setFileDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (requestData.length > 0) {
      setLoading(true);
      const fetchFiles = async () => {
        try {
          const response = await axios.post('http://localhost:3001/search-files', { [logicalOperator]: requestData });
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
        } finally {
          setLoading(false);
        }
      };

      fetchFiles();
    }
  }, [requestData, logicalOperator]);

  return { fileDetails, loading };
};

export default useFetchFiles;
