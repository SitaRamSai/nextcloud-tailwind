// src/components/SuccessModal.jsx

import React from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-green-500">Success!</h2>
        <p>Your files have been successfully uploaded.</p>
        <button onClick={onClose} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
