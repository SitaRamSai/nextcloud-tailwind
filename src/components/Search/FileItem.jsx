import React from 'react';
import { FiDownload, FiTrash2, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FileItem = ({ file, handleDownload, handleDownloadFromS3WithPresignedUrl, handleDelete, handlePolicyClick }) => {
  return (
    <div key={file.fileid} className="border-b border-gray-200 py-4 flex justify-between items-start">
      <div className="flex-1">
        <div className="text-gray-500">
          <div className="mb-1">
            <span className="font-bold">Policy Number:</span>
            <Link to={`/policy-details/${file.policyNumber}`} className="text-blue-500 hover:underline ml-1">
              {file.policyNumber || 'N/A'}
            </Link>
          </div>
          <div className="mb-1">
            <span className="font-bold">Insured Name:</span> {file.insuredName || 'N/A'}
          </div>
          <div className="mb-1">
            <span className="font-bold">UW Name:</span> {file.uwName || 'N/A'}
          </div>
          <div className="mb-1">
            <span className="font-bold">LOB:</span> {file.lob || 'N/A'}
          </div>
          <div className="mb-1">
            <span className="font-bold">Broker Company:</span> {file.brokerCompany || 'N/A'}
          </div>
          <div className="mb-1">
            <span className="font-bold">System Tags:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {file.allSystemTags.map((tag, index) => (
                <span key={index} className="bg-gray-200 rounded px-2 py-1 text-sm flex-none">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mb-2 text-right">
          <div className="font-bold text-lg">File Name:</div>
          <div className="text-gray-800">{file.file_name || 'No filename provided'}</div>
        </div>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mb-2 flex items-center"
          onClick={() => handleDownload(file.file_name)}
        >
          <FiDownload className="mr-1" /> Nextcloud
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 mb-2 flex items-center"
          onClick={() => handleDownloadFromS3WithPresignedUrl(file.file_name)}
        >
          <FiDownload className="mr-1" /> S3 Presigned
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 flex items-center"
          onClick={() => handleDelete(file.file_name, file.fileid)}
        >
          <FiTrash2 className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default FileItem;
