// src/pages/AddPolicy.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTags, uploadFiles, submitPolicyData, createTag, getTagId, assignTagToFiles } from '../utils/api';
import PolicyForm from '../components/AddPolicy/PolicyForm';
import FileUploader from '../components/AddPolicy/FileUploader';
import SuccessModal from '../components/AddPolicy/SuccessModal';
import PolicyInformation from '../components/AddPolicy/PolicyInformation';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'; // Import success, error, and loading icons

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
  const [submitted, setSubmitted] = useState(false); // Track if form has been submitted
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
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [errorMessage, setErrorMessage] = useState(''); // Track the error message

  const steps = [
    'Fetching tags',
    'Uploading files',
    'Submitting policy data',
    'Updating tags',
    'Completed'
  ];

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
    setIsLoading(true);
    setSubmitted(true); // Mark form as submitted
    setCurrentStep(0); // Reset the step
    setErrorMessage(''); // Reset the error message

    try {
      // Step 1: Fetch tags
      setCurrentStep(1);
      const fetchedTags = await fetchTags();

      // Step 2: Upload files
      setCurrentStep(2);
      const formattedStartDate = formatDateWithTime(formData.policyStartDate);
      const formattedExpirationDate = formatDateWithTime(formData.policyExpirationDate);
      const uploadData = await uploadFiles(selectedFiles);

      // Step 3: Submit policy data
      setCurrentStep(3);
      const policyData = {
        ...formData,
        policyStartDate: formattedStartDate,
        policyExpirationDate: formattedExpirationDate,
        fileNames: selectedFiles.map((fileObj, index) => ({
          name: fileObj.name,
          fileNextcloudId: uploadData.fileIds[index],
          path: "PolicyDocs/BoundPolicyDocs/Europe/"
        }))
      };
      await submitPolicyData(policyData);

      // Step 4: Update tags
      setCurrentStep(4);
      const taggableFields = ['policyNumber', 'insuredName', 'uwName', 'lob', 'brokerCompany'];
      if (customTag.trim() !== '') {
        taggableFields.push(customTag);
      }
      for (const field of taggableFields) {
        const tagName = field === customTag ? `Custom_${customTag}` : `${field}_${formData[field]}`;
        const existingTag = fetchedTags.find(tag => tag.name === tagName);
        let tagId;
        if (existingTag) {
          tagId = existingTag.id;
        } else {
          const newTag = await createTag(tagName);
          tagId = await getTagId(tagName);
        }
        await assignTagToFiles(uploadData.fileIds, tagId);
      }

      setCurrentStep(5); // Mark completion

      setShowSuccessModal(true);
      setSelectedFiles([]); // Clear selected files after successful upload
    } catch (error) {
      console.error('Error during the upload or tag handling:', error);
      setErrorMessage(error.message);
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
        <h3 className="text-xl font-semibold mb-4">Policy Information</h3>
        <PolicyInformation formData={formData} displayData={displayData} handleInputChange={handleInputChange} />
        <h3 className="text-xl font-semibold mt-8 mb-4">File Upload</h3>
        <FileUploader selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} customTag={customTag} setCustomTag={setCustomTag} />
        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${
                currentStep === 5 ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <div key={index} className={`text-xs flex items-center ${currentStep > index ? 'text-green-500' : currentStep === index && errorMessage ? 'text-red-500' : 'text-gray-500'}`}>
                {currentStep > index && <AiOutlineCheckCircle className="mr-1" />}
                {currentStep === index && isLoading && !errorMessage && <AiOutlineLoading3Quarters className="animate-spin mr-1" />}
                {currentStep === index && errorMessage && <AiOutlineCloseCircle className="mr-1" />}
                {currentStep < index && <AiOutlineCloseCircle className="mr-1" />}
                {step}
              </div>
            ))}
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-500 flex items-center">
              <AiOutlineCloseCircle size={24} className="inline mr-1" /> {errorMessage}
            </div>
          )}
        </div>
        <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      </div>
    </div>
  );
};

export default AddPolicy;
