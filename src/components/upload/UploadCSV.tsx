import React, { useState } from 'react';

export interface IUploadCSV {
  onUpload: (_file: File) => void;
}

const UploadCSV: React.FC<IUploadCSV> = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`border-2 border-dashed p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="input-file-upload"
          className="hidden"
          accept=".csv"
          onChange={handleChange}
        />
        <label
          htmlFor="input-file-upload"
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          <span>Click to upload</span> or drag and drop
        </label>
        <p className="mt-2 text-sm text-gray-500">CSV files only</p>
      </div>
    </div>
  );
};

export default UploadCSV;
