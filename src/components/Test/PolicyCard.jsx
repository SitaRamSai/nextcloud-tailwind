// src/components/PolicyCard.jsx

import React from 'react';
import {
  AiOutlineFileText,
  AiOutlineCalendar,
  AiOutlineUser,
} from 'react-icons/ai';

const PolicyCard = ({ policy, onSelect }) => {
  const isExpired = new Date(policy.policyExpirationDate) < new Date();
  const statusBadge = isExpired ? (
    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-bold">Expired</span>
  ) : (
    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-bold">Active</span>
  );

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(policy.policyNumber)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <AiOutlineFileText className="text-blue-500 text-2xl mr-2" />
          <div>
            <h2 className="text-lg font-bold text-gray-600">Policy Number</h2>
            <h3 className="text-xl font-bold text-blue-600">{policy.policyNumber}</h3>
          </div>
        </div>
        {statusBadge}
      </div>
      <div className="text-gray-700">
        <div className="flex items-center mb-2">
          <AiOutlineUser className="mr-2" />
          <span className="font-bold mr-1">Insured Name:</span>{policy.insuredName}
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineCalendar className="mr-2" />
          <span className="font-bold mr-1">Policy Period:</span>
          {new Date(policy.policyStartDate).toLocaleDateString()} - {new Date(policy.policyExpirationDate).toLocaleDateString()}
        </div>
        <div className="flex items-center mb-2">
          <AiOutlineUser className="mr-2" />
          <span className="font-bold mr-1">UW Name:</span>{policy.uwName}
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
