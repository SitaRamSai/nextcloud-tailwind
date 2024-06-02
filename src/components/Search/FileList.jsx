import React from 'react';
import FileItem from './FileItem';

const FileList = ({ fileDetails, handleDownload, handleDownloadFromS3WithPresignedUrl, handleDelete, handlePolicyClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      {fileDetails.map((file) => (
        <FileItem
          key={file.fileid}
          file={file}
          handleDownload={handleDownload}
          handleDownloadFromS3WithPresignedUrl={handleDownloadFromS3WithPresignedUrl}
          handleDelete={handleDelete}
          handlePolicyClick={handlePolicyClick}
        />
      ))}
    </div>
  );
};

export default FileList;
