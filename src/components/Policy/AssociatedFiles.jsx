// src/components/AssociatedFiles.jsx

import React from 'react';
import { AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop();
  switch (extension) {
    case 'pdf':
      return '📄'; // PDF icon
    case 'doc':
    case 'docx':
      return '📝'; // Word document icon
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '🖼️'; // Image icon
    default:
      return '📁'; // Default file icon
  }
};

const AssociatedFiles = ({ files, onDownload, onDownloadFromS3, onDelete }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h3 className="text-xl font-bold mb-4">Associated Files</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{getFileIcon(file.name)}</span>
            <span className="font-semibold">{file.name}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <p>Size: {file.size} KB</p>
            <p>Uploaded: {new Date(file.uploadDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => onDownload(file.name)}>
              <AiOutlineDownload className="mr-1" /> Nextcloud
            </button>
            <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => onDownloadFromS3(file.name)}>
              <AiOutlineDownload className="mr-1" /> S3
            </button>
            <button className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => onDelete(file.name, index)}>
              <AiOutlineDelete className="mr-1" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AssociatedFiles;
