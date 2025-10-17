'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FileUpload from '@/components/FileUpload';
import UploadedFile from '@/components/UploadedFile';
import Button from '@/components/Button';
import PrescriptionResultModal from '@/components/PrescriptionResultModal';
import { matchMedicinesWithDatabase } from '@/utils/medicineMatching';
import { CartItem } from '@/types/medicine';

interface ExtractedMedicine {
  name: string;
  dosage?: string;
  quantity?: number;
}

interface ProcessingResult {
  matched: CartItem[];
  unmatched: ExtractedMedicine[];
}

export default function UploadPrescriptionPage() {
  const router = useRouter();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string>('');
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setError('');
    setProcessingResult(null);

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
    setError('');
    setProcessingResult(null);
    setShowResultModal(false);
  };

  const handleProceedToPayment = () => {
    setShowResultModal(false);
    router.push('/payment');
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    router.push('/select-medicine');
  };

  const handleContinue = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setError('');

    try {
      // Create FormData and send to API
      const formData = new FormData();
      formData.append('file', uploadedFile);

      const response = await fetch('/api/process-prescription', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process prescription');
      }

      if (!data.medicines || data.medicines.length === 0) {
        setError('No medicines found in the prescription. Please try another image or select medicines manually.');
        setIsProcessing(false);
        return;
      }

      // Match medicines with database
      const result = matchMedicinesWithDatabase(data.medicines);
      setProcessingResult(result);

      if (result.matched.length === 0) {
        setError('None of the medicines in the prescription match our database. Please select medicines manually.');
        setIsProcessing(false);
        return;
      }

      // Store matched medicines in sessionStorage as cart
      sessionStorage.setItem('cart', JSON.stringify(result.matched));

      // Show beautiful modal with results
      setShowResultModal(true);

    } catch (err) {
      console.error('Error processing prescription:', err);
      setError(err instanceof Error ? err.message : 'Failed to process prescription. Please try again.');
    } finally {
      setIsProcessing(false);
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
          Upload Your Doctor&apos;s Prescription (PDF or JPG)
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-red-900 mb-1">Processing Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Processing Result */}
        {processingResult && processingResult.matched.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="font-bold text-green-900 mb-2">Medicines Found</h3>
                <ul className="space-y-1 text-green-700 text-sm">
                  {processingResult.matched.map((item, index) => (
                    <li key={index}>
                      ✓ {item.medicine.name} (Qty: {item.quantity})
                    </li>
                  ))}
                </ul>
                {processingResult.unmatched.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-yellow-700 text-sm font-medium">
                      Not found in database: {processingResult.unmatched.map(m => m.name).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {uploadedFile && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={handleContinue}
              className="max-w-[200px]"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        )}

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold text-blue-900 mb-1">How it works</h3>
              <ul className="text-blue-700 text-sm space-y-1 list-disc list-inside">
                <li>Upload a clear photo or PDF of your prescription</li>
                <li>AI will analyze and extract medicine names</li>
                <li>Matched medicines will be added to your cart automatically</li>
                <li>Review and proceed to payment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-start">
          <button
            onClick={() => router.back()}
            className="font-medium transition-all hover:underline hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              fontSize: '16px',
              color: '#638864'
            }}
            disabled={isProcessing}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Prescription Result Modal */}
      {processingResult && (
        <PrescriptionResultModal
          isOpen={showResultModal}
          onClose={handleCloseModal}
          onProceed={handleProceedToPayment}
          matched={processingResult.matched}
          unmatched={processingResult.unmatched}
        />
      )}
    </div>
  );
}

