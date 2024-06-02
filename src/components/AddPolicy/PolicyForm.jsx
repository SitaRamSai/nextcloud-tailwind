// src/components/PolicyForm.jsx

import React from 'react';
import FormField from './FormField';

const PolicyForm = ({ formData, setFormData, displayData, handleInputChange }) => {
  return (
    <form className="space-y-4">
      <FormField label="Policy Number" name="policyNumber" value={formData.policyNumber} readOnly />
      <FormField label="Insured Name" name="insuredName" value={formData.insuredName} onChange={handleInputChange} />
      <FormField label="UW Name" name="uwName" value={formData.uwName} onChange={handleInputChange} />
      <FormField label="LOB" name="lob" value={formData.lob} onChange={handleInputChange} />
      <FormField label="Broker Company" name="brokerCompany" value={formData.brokerCompany} onChange={handleInputChange} />
      <FormField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
      <FormField label="Region" name="region" value={formData.region} onChange={handleInputChange} />
      <FormField label="Source" name="source" value={formData.source} onChange={handleInputChange} />
      <FormField label="Policy Start Date" name="policyStartDate" type="date" value={formData.policyStartDate} onChange={handleInputChange} />
      <FormField label="Policy Expiration Date" name="policyExpirationDate" type="date" value={formData.policyExpirationDate} onChange={handleInputChange} />
      <FormField label="Coverage Premium" name="coveragePremium" value={displayData.coveragePremium} onChange={handleInputChange} />
      <FormField label="Coverage Limit" name="coverageLimit" value={displayData.coverageLimit} onChange={handleInputChange} />
    </form>
  );
};

export default PolicyForm;
