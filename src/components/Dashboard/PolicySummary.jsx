// src/components/PolicySummary.jsx

import React from 'react';
import { AiOutlinePlus, AiOutlineFileText, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const PolicySummary = ({ totalPolicies, activePolicies, expiredPolicies }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Policy Dashboard</h2>
      <div className="flex justify-around">
        <div className="flex flex-col items-center bg-blue-100 p-8 rounded-full shadow-sm w-40 h-40 justify-center">
          <AiOutlineFileText className="text-blue-500 text-6xl mb-3" />
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-2xl">{totalPolicies}</p>
        </div>
        <div className="flex flex-col items-center bg-green-100 p-8 rounded-full shadow-sm w-40 h-40 justify-center">
          <AiOutlineCheckCircle className="text-green-500 text-6xl mb-3" />
          <h3 className="text-lg font-semibold">Active</h3>
          <p className="text-2xl text-green-600">{activePolicies}</p>
        </div>
        <div className="flex flex-col items-center bg-red-100 p-8 rounded-full shadow-sm w-40 h-40 justify-center">
          <AiOutlineCloseCircle className="text-red-500 text-6xl mb-3" />
          <h3 className="text-lg font-semibold">Expired</h3>
          <p className="text-2xl text-red-600">{expiredPolicies}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-8 rounded-full shadow-sm w-40 h-40 justify-center">
          <button
            className="flex flex-col items-center bg-blue-500 text-white p-6 rounded-full hover:bg-blue-600 transition w-full h-full justify-center"
            onClick={() => navigate('/add-policy')}
          >
            <AiOutlinePlus className="text-6xl mb-1" />
            <span className="text-lg font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicySummary;
