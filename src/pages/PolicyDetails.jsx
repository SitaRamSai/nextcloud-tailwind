// src/pages/PolicyDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';
import { fetchPolicyDetails, fetchPresignedUrl, deleteFile } from '../utils/api';
import PolicyInfo from '../components/Policy/PolicyInfo';
import AssociatedFiles from '../components/Policy/AssociatedFiles';

const PolicyDetails = () => {
  const { policyNumber } = useParams();
  const navigate = useNavigate();
  const [policyDetails, setPolicyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPolicyDetails = async () => {
      try {
        const data = await fetchPolicyDetails(policyNumber);
        setPolicyDetails(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch policy details:", e);
      } finally {
        setLoading(false);
      }
    };

    loadPolicyDetails();
  }, [policyNumber]);

  const handleDownloadFromS3WithPresignedUrl = async (fileName) => {
    try {
      const url = await fetchPresignedUrl(fileName);
      window.location.href = url;
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please check the console for more details.');
    }
  };

  const handleDirectDownload = (fileName) => {
    window.location.href = `https://5knptmetu2.execute-api.us-east-1.amazonaws.com/test/api/v1/files/download/${fileName}`;
  };

  const handleDelete = async (fileName, fileIndex) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${fileName}?`);
    if (isConfirmed) {
      try {
        await deleteFile(fileName);
        alert(`File '${fileName}' deleted successfully.`);
        const updatedFiles = policyDetails.fileNames.filter((_, index) => index !== fileIndex);
        setPolicyDetails({ ...policyDetails, fileNames: updatedFiles });
      } catch (error) {
        console.error('Error:', error);
        alert(`Error deleting file '${fileName}': ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center"><div className="loader">Loading...</div></div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center"><p className="text-red-500">Error loading page: {error}</p></div>;
  }

  if (!policyDetails) {
    return <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center"><p>No policy details found.</p></div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <button 
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={() => navigate(-1)}
        >
          <AiOutlineRollback className="mr-2" />Back to Dashboard
        </button>
        <PolicyInfo policyDetails={policyDetails} />
        <AssociatedFiles
          files={policyDetails.fileNames}
          onDownload={handleDirectDownload}
          onDownloadFromS3={handleDownloadFromS3WithPresignedUrl}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default PolicyDetails;
