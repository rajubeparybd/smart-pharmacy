'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import UploadedFile from '@/components/UploadedFile';
import Button from '@/components/Button';

export default function UploadPrescriptionPage() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs, we'll just show the file info without preview
      setFilePreview('');
    }
  };

  const handleChangeFile = () => {
    setUploadedFile(null);
    setFilePreview('');
  };

  const handleContinue = () => {
    if (uploadedFile) {
      // Here you would typically upload the file to your backend
      console.log('Uploading file:', uploadedFile);
      alert('Prescription uploaded successfully!');
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-[928px] flex flex-col gap-8">
        {/* Title */}
        <h1
          className="font-extrabold leading-[45px]"
          style={{
            fontSize: '35.9px',
            letterSpacing: '-1.188px',
            color: '#111811'
          }}
        >
          Upload Your Doctor's Prescription (PDF or JPG)
        </h1>

        {/* Upload or Uploaded File */}
        {!uploadedFile ? (
          <FileUpload onFileSelect={handleFileSelect} />
        ) : (
          <UploadedFile
            fileName={uploadedFile.name}
            filePreview={filePreview}
            onChangeFile={handleChangeFile}
          />
        )}

        {/* Continue Button */}
        {uploadedFile && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleContinue}
              className="max-w-[200px]"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => router.back()}
            className="font-medium transition-all hover:underline hover:cursor-pointer"
            style={{
              fontSize: '16px',
              color: '#638864'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

