// src/pages/AddPolicy.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTags, uploadFiles, submitPolicyData } from '../utils/api';
import PolicyForm from '../components/AddPolicy/PolicyForm';
import FileUploader from '../components/AddPolicy/FileUploader';
import SuccessModal from '../components/AddPolicy/SuccessModal';
import PolicyInformation from '../components/AddPolicy/PolicyInformation';

const generateId = () => {
  return Math.floor(Math.random() * 90000) + 10000;
};

const formatDateWithTime = (date) => {
  return `${date} 00:00:00`;
};

const AddPolicy = () => {
  const navigate = useNavigate();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [formData, setFormData] = useState({
    policyNumber: generateId().toString(),
    insuredName: '',
    uwName: '',
    lob: '',
    brokerCompany: '',
    location: '',
    region: '',
    source: '',
    policyStartDate: '',
    policyExpirationDate: '',
    coveragePremium: '',
    coverageLimit: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [customTag, setCustomTag] = useState('');
  const [tags, setTags] = useState([]);
  const [displayData, setDisplayData] = useState({
    coveragePremium: '',
    coverageLimit: '',
  });

  useEffect(() => {
    const fetchInitialTags = async () => {
      const fetchedTags = await fetchTags();
      setTags(fetchedTags);
    };

    fetchInitialTags();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDisplayData({
      ...displayData,
      [name]: value,
    });

    const cleanedValue = value.replace(/[,$]/g, '');
    setFormData({
      ...formData,
      [name]: cleanedValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.insuredName || !formData.uwName || !formData.lob || !formData.brokerCompany) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    setIsLoading(true);

    try {
      const uploadData = await uploadFiles(selectedFiles);

      const policyData = {
        ...formData,
        policyStartDate: formatDateWithTime(formData.policyStartDate),
        policyExpirationDate: formatDateWithTime(formData.policyExpirationDate),
        fileNames: selectedFiles.map((fileObj, index) => ({
          name: fileObj.name,
          fileNextcloudId: uploadData.fileIds[index],
          path: "PolicyDocs/BoundPolicyDocs/Europe/"
        }))
      };

      await submitPolicyData(policyData);

      setShowSuccessModal(true);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error during the upload or tag handling:', error);
      alert('An error occurred during the upload or tag handling. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  const prefillFormData = () => {
    setFormData({
      policyNumber: generateId().toString(),
      insuredName: '',
      uwName: '',
      lob: '',
      brokerCompany: '',
      location: 'New York, NY',
      region: 'North America',
      source: 'Direct',
      policyStartDate: '2024-01-01',
      policyExpirationDate: '2024-12-31',
      coveragePremium: '1000',
      coverageLimit: '1000000',
    });
    setDisplayData({
      coveragePremium: '1000',
      coverageLimit: '1000000',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prefillFormData}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
          >
            Prefill
          </button>
          <h2 className="text-2xl font-bold text-center flex-grow">Add New Policy</h2>
        </div>
        {uploadSuccess && <div className="text-green-500 mb-4 text-center">Successfully uploaded!</div>}
        <h3 className="text-xl font-semibold mb-4">Policy Information</h3>
        <PolicyInformation formData={formData} displayData={displayData} handleInputChange={handleInputChange} />
        <h3 className="text-xl font-semibold mt-8 mb-4">File Upload</h3>
        <FileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} customTag={customTag} setCustomTag={setCustomTag} />
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {isLoading && <div className="text-blue-500 text-center mt-4">Uploading...</div>}
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      </div>
    </div>
  );
};

export default AddPolicy;
