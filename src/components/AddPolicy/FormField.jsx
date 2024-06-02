// src/components/FormField.jsx

import React from 'react';

const FormField = ({ label, name, value, onChange, type = 'text', readOnly = false }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default FormField;
