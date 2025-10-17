'use client';

import { ChangeEvent, DragEvent, useRef, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: string;
  maxSizeMB?: number;
}

export default function FileUpload({ 
  onFileSelect, 
  acceptedFormats = '.pdf,.jpg,.jpeg',
  maxSizeMB = 10 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center cursor-pointer transition-all ${
        isDragging ? 'scale-[1.02]' : ''
      }`}
      style={{
        border: '2px dashed #DDE5DC',
        borderRadius: '24px',
        padding: '58px 26px',
        gap: '24px'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-2">
        <p
          className="font-bold text-center"
          style={{
            fontSize: '18px',
            lineHeight: '22.5px',
            letterSpacing: '-0.27px',
            color: '#111811'
          }}
        >
          Drop file here or click to upload
        </p>
        <p
          className="font-normal text-center"
          style={{
            fontSize: '14px',
            lineHeight: '21px',
            color: '#ACD8E6'
          }}
        >
          Supported file types: PDF, JPG
        </p>
      </div>

      <button
        type="button"
        className="font-bold transition-all hover:scale-105 active:scale-95"
        style={{
          background: '#4CAF50',
          color: '#FFFFFF',
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0.21px',
          padding: '9.5px 17.38px',
          borderRadius: '24px',
          minWidth: '84px',
          height: '40px'
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        Upload
      </button>
    </div>
  );
}

