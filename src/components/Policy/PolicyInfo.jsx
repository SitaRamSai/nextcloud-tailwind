// src/components/PolicyInfo.jsx

import React from 'react';
import { AiOutlineFileText, AiOutlineUser, AiOutlineEnvironment, AiOutlineInfoCircle, AiOutlineCalendar } from 'react-icons/ai';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const PolicyInfo = ({ policyDetails }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold mb-4">Policy Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Basic Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Basic Details</h3>
        <div className="flex items-center mb-2">
          <AiOutlineFileText className="mr-2 text-blue-500" />
          <span className="font-bold">Policy Number:</span>
          <span className="ml-2">{policyDetails.policyNumber}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineUser className="mr-2 text-blue-500" />
          <span className="font-bold">Insured Name:</span>
          <span className="ml-2">{policyDetails.insuredName}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineUser className="mr-2 text-blue-500" />
          <span className="font-bold">UW Name:</span>
          <span className="ml-2">{policyDetails.uwName}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="mr-2 text-blue-500" />
          <span className="font-bold">LOB:</span>
          <span className="ml-2">{policyDetails.lob}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineEnvironment className="mr-2 text-blue-500" />
          <span className="font-bold">Broker Company:</span>
          <span className="ml-2">{policyDetails.brokerCompany}</span>
        </div>
      </div>

      {/* Location Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Location Details</h3>
        <div className="flex items-center mb-2">
          <AiOutlineEnvironment className="mr-2 text-green-500" />
          <span className="font-bold">Location:</span>
          <span className="ml-2">{policyDetails.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineEnvironment className="mr-2 text-green-500" />
          <span className="font-bold">Region:</span>
          <span className="ml-2">{policyDetails.region}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="mr-2 text-green-500" />
          <span className="font-bold">Source:</span>
          <span className="ml-2">{policyDetails.source}</span>
        </div>
      </div>

      {/* Date Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Date Details</h3>
        <div className="flex items-center mb-2">
          <AiOutlineCalendar className="mr-2 text-red-500" />
          <span className="font-bold">Policy Start Date:</span>
          <span className="ml-2">{policyDetails.policyStartDate}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineCalendar className="mr-2 text-red-500" />
          <span className="font-bold">Policy Expiration Date:</span>
          <span className="ml-2">{policyDetails.policyExpirationDate}</span>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Coverage Details</h3>
        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="mr-2 text-purple-500" />
          <span className="font-bold">Coverage Premium:</span>
          <span className="ml-2">{formatCurrency(policyDetails.coveragePremium)}</span>
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineInfoCircle className="mr-2 text-purple-500" />
          <span className="font-bold">Coverage Limit:</span>
          <span className="ml-2">{formatCurrency(policyDetails.coverageLimit)}</span>
        </div>
      </div>
    </div>
  </div>
);

export default PolicyInfo;
