// long search bar

// import React from 'react';

// const PolicySearch = ({ searchTerm, onSearchChange }) => {
//   return (
//     <div className="mb-4 flex justify-center space-x-4">
//       <input
//         type="text"
//         placeholder="Search policies..."
//         value={searchTerm}
//         onChange={onSearchChange}
//         className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// export default PolicySearch;


// short search bar

import React from 'react';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';

const PolicySearch = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="mb-4 flex justify-center space-x-4">
      <div className="relative w-full max-w-lg">
        <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by policy number, insured name, UW name..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-10 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <AiOutlineCloseCircle
            className="absolute right-3 top-3 text-gray-400 cursor-pointer"
            onClick={onClearSearch}
          />
        )}
      </div>
    </div>
  );
};

export default PolicySearch;