// src/components/FileUploader.jsx

import React, { useState, useRef } from 'react';
import { AiOutlineUpload, AiOutlineClose } from 'react-icons/ai';

const processFiles = (incomingFiles, selectedFiles) => {
  return incomingFiles.map(incomingFile => {
    let newName = incomingFile.name;
    let counter = 1;
    while (selectedFiles.some(file => file.name === newName)) {
      const namePart = incomingFile.name.replace(/\.[^/.]+$/, "");
      const extension = incomingFile.name.split('.').pop();
      newName = `${namePart}_${counter}.${extension}`;
      counter++;
    }
    return { file: incomingFile, name: newName };
  });
};

const FileUploader = ({ selectedFiles, setSelectedFiles, customTag, setCustomTag }) => {
  const fileInputRef = useRef(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    const incomingFiles = Array.from(event.target.files);
    const updatedFiles = processFiles(incomingFiles, selectedFiles);
    setSelectedFiles([...selectedFiles, ...updatedFiles]);
    setFileInputKey(Date.now());
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const incomingFiles = Array.from(event.dataTransfer.files);
    const updatedFiles = processFiles(incomingFiles, selectedFiles);
    setSelectedFiles(prevFiles => [...prevFiles, ...updatedFiles]);
    setFileInputKey(Date.now());
    setDragOver(false);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="mt-8">
      <div
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} p-8 text-center rounded-lg cursor-pointer transition-all duration-200`}
      >
        <AiOutlineUpload className="text-4xl text-gray-500 mb-2" />
        <p className="text-gray-500">Drag and drop files here or click to select files</p>
        <input 
          type="file" 
          onChange={handleFileChange} 
          multiple 
          hidden 
          key={fileInputKey} 
          ref={fileInputRef}
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="customTag">Custom Tag</label>
        <input
          id="customTag"
          name="customTag"
          placeholder="Enter custom tag for all files"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          key="customTagInput"
        />
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedFiles.map((fileObj, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
            <span>{fileObj.name}</span>
            <button onClick={() => removeFile(index)} className="text-red-500">
              <AiOutlineClose />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
