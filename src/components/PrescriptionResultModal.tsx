import { CartItem } from '@/types/medicine';

interface ExtractedMedicine {
  name: string;
  dosage?: string;
  quantity?: number;
}

interface PrescriptionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  matched: CartItem[];
  unmatched: ExtractedMedicine[];
}

export default function PrescriptionResultModal({
  isOpen,
  onClose,
  onProceed,
  matched,
  unmatched
}: PrescriptionResultModalProps) {
  if (!isOpen) return null;

  const totalCount = matched.length + unmatched.length;

  return (
    <>
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-50 transition-all animate-fadeIn"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden pointer-events-auto animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-2xl mb-1">
                  Prescription Processed!
                </h2>
                <p className="text-white/90 text-sm">
                  {matched.length} of {totalCount} medicine{totalCount !== 1 ? 's' : ''} found in our stock
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-280px)] p-6">
            {/* Matched Medicines */}
            {matched.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Added to Cart ({matched.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {matched.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl transition-all hover:shadow-md"
                    >
                      {/* Medicine Icon */}
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-2xl">💊</span>
                      </div>

                      {/* Medicine Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">
                          {item.medicine.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          <span>•</span>
                          <span className="font-semibold text-green-600">
                            ৳{item.medicine.price}
                          </span>
                        </div>
                      </div>

                      {/* Checkmark */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unmatched Medicines */}
            {unmatched.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    Not Found ({unmatched.length})
                  </h3>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-800 mb-3">
                    The following medicines are not available in our database:
                  </p>
                  <ul className="space-y-2">
                    {unmatched.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-amber-900">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span className="font-medium">
                          {item.name}
                          {item.dosage && <span className="text-amber-700"> ({item.dosage})</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-amber-700 mt-3 italic">
                    You can add these manually from the medicine selection page
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-end">
              <button
                onClick={onProceed}
                className="flex-1 px-6 py-4 rounded-xl font-bold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0px 4px 16px rgba(16, 185, 129, 0.4)'
                }}
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

