// src/components/PolicyInformation.jsx

import React from 'react';

const PolicyInformation = ({ formData, displayData, handleInputChange }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label className="font-semibold">Policy Number</label>
      <input
        readOnly
        name="policyNumber"
        value={formData.policyNumber}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">
        Insured Name <span className="text-red-500">*</span>
      </label>
      <input
        placeholder="Insured Name"
        name="insuredName"
        value={formData.insuredName}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">
        UW Name <span className="text-red-500">*</span>
      </label>
      <input
        placeholder="UW Name"
        name="uwName"
        value={formData.uwName}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">
        LOB <span className="text-red-500">*</span>
      </label>
      <input
        placeholder="LOB"
        name="lob"
        value={formData.lob}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">
        Broker Company <span className="text-red-500">*</span>
      </label>
      <input
        placeholder="Broker Company"
        name="brokerCompany"
        value={formData.brokerCompany}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Location</label>
      <input
        placeholder="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Region</label>
      <input
        placeholder="Region"
        name="region"
        value={formData.region}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Source</label>
      <input
        placeholder="Source"
        name="source"
        value={formData.source}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Policy Start Date</label>
      <input
        type="date"
        name="policyStartDate"
        value={formData.policyStartDate}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Policy Expiration Date</label>
      <input
        type="date"
        name="policyExpirationDate"
        value={formData.policyExpirationDate}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Coverage Premium</label>
      <input
        placeholder="Coverage Premium"
        name="coveragePremium"
        value={displayData.coveragePremium}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="flex flex-col">
      <label className="font-semibold">Coverage Limit</label>
      <input
        placeholder="Coverage Limit"
        name="coverageLimit"
        value={displayData.coverageLimit}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  </div>
);

export default PolicyInformation;
