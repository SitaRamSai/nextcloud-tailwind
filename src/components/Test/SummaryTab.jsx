import React from 'react';
import { AiOutlineFileText, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SummaryTab = () => {
  const navigate = useNavigate();
  const totalPolicies = 100; // Example data, replace with actual data
  const activePolicies = 80;
  const expiredPolicies = 20;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-blue-100 p-4 rounded-lg shadow-sm flex items-center">
        <AiOutlineFileText className="text-blue-500 text-3xl mr-3" />
        <div>
          <h3 className="text-lg font-semibold">Total Policies</h3>
          <p className="text-2xl">{totalPolicies}</p>
        </div>
      </div>
      <div className="bg-green-100 p-4 rounded-lg shadow-sm flex items-center">
        <AiOutlineCheckCircle className="text-green-500 text-3xl mr-3" />
        <div>
          <h3 className="text-lg font-semibold">Active Policies</h3>
          <p className="text-2xl text-green-600">{activePolicies}</p>
        </div>
      </div>
      <div className="bg-red-100 p-4 rounded-lg shadow-sm flex items-center">
        <AiOutlineCloseCircle className="text-red-500 text-3xl mr-3" />
        <div>
          <h3 className="text-lg font-semibold">Expired Policies</h3>
          <p className="text-2xl text-red-600">{expiredPolicies}</p>
        </div>
      </div>
      <div className="mt-6">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition w-full"
          onClick={() => navigate('/add-policy')}
        >
          <AiOutlinePlus className="mr-2 text-xl" />
          <span className="text-lg font-semibold">Add Policy</span>
        </button>
      </div>
    </div>
  );
};

export default SummaryTab;
