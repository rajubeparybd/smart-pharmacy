import { CartItem } from '@/types/medicine';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onIncrement: (medicineId: string) => void;
  onDecrement: (medicineId: string) => void;
  onProceedToPayment: () => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  totalPrice,
  onIncrement,
  onDecrement,
  onProceedToPayment
}: CartModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-40 transition-all"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              className="font-bold"
              style={{
                fontSize: '24px',
                lineHeight: '32px',
                fontFamily: 'Manrope, sans-serif',
                color: '#1F2937'
              }}
            >
              Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="overflow-y-auto max-h-96 p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p
                  className="text-gray-500"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif'
                  }}
                >
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.medicine.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl"
                  >
                    {/* Medicine Image */}
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">💊</span>
                    </div>

                    {/* Medicine Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold truncate"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#1F2937'
                        }}
                      >
                        {item.medicine.name}
                      </h3>
                      <p
                        className="text-gray-500"
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Manrope, sans-serif'
                        }}
                      >
                        ৳{item.medicine.price} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDecrement(item.medicine.id)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span
                        className="font-bold w-8 text-center"
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#1F2937'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onIncrement(item.medicine.id)}
                        className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div
                      className="font-bold"
                      style={{
                        fontSize: '18px',
                        fontFamily: 'Manrope, sans-serif',
                        color: '#4CAF50'
                      }}
                    >
                      ৳{item.medicine.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-bold"
                  style={{
                    fontSize: '20px',
                    lineHeight: '28px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#1F2937'
                  }}
                >
                  Total Amount
                </span>
                <span
                  className="font-bold"
                  style={{
                    fontSize: '24px',
                    lineHeight: '32px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#4CAF50'
                  }}
                >
                  ৳{totalPrice}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:bg-gray-200 bg-white border-2 border-gray-200 hover:cursor-pointer"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#1F2937'
                  }}
                >
                  Continue Shopping
                </button>
                <button
                  onClick={onProceedToPayment}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:opacity-90 hover:cursor-pointer"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    background: '#18DC1F',
                    color: '#FFFFFF',
                    boxShadow: '0px 4px 12px rgba(24, 220, 31, 0.3)'
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

