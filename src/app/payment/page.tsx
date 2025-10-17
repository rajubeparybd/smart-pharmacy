'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types/medicine';

type PaymentMethod = 'card' | 'mobile' | null;
type MobileProvider = 'bkash' | 'nagad' | 'rocket' | null;

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  
  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // Mobile payment states
  const [selectedProvider, setSelectedProvider] = useState<MobileProvider>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    // Load cart from sessionStorage
    const cartData = sessionStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    } else {
      // No cart data, redirect back
      router.push('/select-medicine');
    }
  }, [router]);

  const totalPrice = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    
    // Validate card payment
    if (selectedPayment === 'card') {
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        alert('Please fill in all card details');
        return;
      }
    }
    
    // Validate mobile payment
    if (selectedPayment === 'mobile') {
      if (!selectedProvider || !phoneNumber || !transactionId) {
        alert('Please select a provider, enter your phone number, and transaction ID');
        return;
      }
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart
    sessionStorage.removeItem('cart');
    
    setIsProcessing(false);
    
    // Show thank you page
    setShowThankYou(true);
  };
  
  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  if (cart.length === 0 && !showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Thank You Page
  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-lg p-12">
            <div className="mb-6">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1
              className="font-bold mb-4"
              style={{
                fontSize: '36px',
                lineHeight: '45px',
                fontFamily: 'Manrope, sans-serif',
                color: '#1F2937'
              }}
            >
              Thank You!
            </h1>
            <p
              className="mb-8"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Manrope, sans-serif',
                color: '#6B7280'
              }}
            >
              Your payment has been successfully processed. Your order will be delivered soon.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-12 py-4 rounded-2xl font-bold transition-all hover:opacity-90"
              style={{
                fontSize: '16px',
                fontFamily: 'Manrope, sans-serif',
                background: '#18DC1F',
                color: '#FFFFFF',
                boxShadow: '0px 4px 12px rgba(24, 220, 31, 0.3)'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 gap-3">
          <button
            onClick={() => selectedPayment ? setSelectedPayment(null) : router.back()}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1
            className="font-bold text-center"
            style={{
              fontSize: '30px',
              lineHeight: '36px',
              fontFamily: 'Manrope, sans-serif',
              color: '#1F2937'
            }}
          >
            UIU Smart Pharmacy
          </h1>
        </div>

        {!selectedPayment && (
          <>
            {/* Order Summary Card */}
        <div className="bg-white rounded-3xl shadow-sm p-4 mb-8">
          <div className="px-4 pb-2">
            <h2
              className="font-bold mb-2"
              style={{
                fontSize: '18px',
                lineHeight: '22.5px',
                fontFamily: 'Manrope, sans-serif',
                color: '#111811',
                letterSpacing: '-0.27px'
              }}
            >
              Order Summary
            </h2>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-3 gap-2 px-4 pb-2 border-b border-[#E5E7EB]">
            <div
              className="font-semibold"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Manrope, sans-serif',
                color: '#638864'
              }}
            >
              Tablet Name
            </div>
            <div
              className="font-semibold text-center"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Manrope, sans-serif',
                color: '#638864'
              }}
            >
              Quantity
            </div>
            <div
              className="font-semibold text-right"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                fontFamily: 'Manrope, sans-serif',
                color: '#638864'
              }}
            >
              Price per item
            </div>
          </div>

          {/* Table Rows */}
          <div className="px-4">
            {cart.map((item, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 gap-2 py-2 ${index !== cart.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}
              >
                <div
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#111811'
                  }}
                >
                  {item.medicine.name}
                </div>
                <div
                  className="text-center"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#111811'
                  }}
                >
                  {item.quantity}
                </div>
                <div
                  className="text-right"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#111811'
                  }}
                >
                  ৳{item.medicine.price}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="grid grid-cols-2 gap-2 px-4 pt-4">
            <div
              className="font-bold"
              style={{
                fontSize: '16px',
                lineHeight: '24px',
                fontFamily: 'Manrope, sans-serif',
                color: '#111811'
              }}
            >
              Total
            </div>
            <div
              className="font-bold text-right"
              style={{
                fontSize: '18px',
                lineHeight: '28px',
                fontFamily: 'Manrope, sans-serif',
                color: '#111811'
              }}
            >
              ৳{totalPrice}
            </div>
          </div>
        </div>

            {/* Choose Payment Method */}
            <div className="mb-8">
              <h2
                className="font-bold text-center mb-5"
                style={{
                  fontSize: '22px',
                  lineHeight: '27.5px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#111811',
                  letterSpacing: '-0.33px'
                }}
              >
                Choose Payment Method
              </h2>

              <div className="flex gap-4 justify-center mb-6">
                {/* Card Payment Button */}
                <button
                  onClick={() => setSelectedPayment('card')}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all bg-white text-[#4CAF50] border-2 border-[#4CAF50] hover:bg-green-50"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '0.24px'
                  }}
                >
                  <span className="text-xl">💳</span>
                  Card Payment
                </button>

                {/* Mobile Payment Button */}
                <button
                  onClick={() => setSelectedPayment('mobile')}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all bg-white text-[#111811] border-2 border-[#E5E7EB] hover:bg-gray-50"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    letterSpacing: '0.24px'
                  }}
                >
                  <span className="text-xl">📱</span>
                  Mobile Payment
                </button>
              </div>
            </div>
          </>
        )}

        {/* Card Payment Form */}
        {selectedPayment === 'card' && (
          <div className="space-y-6">
            <div>
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: '36px',
                  lineHeight: '45px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#1F2937',
                  letterSpacing: '-1.19px'
                }}
              >
                Secure Card Payment
              </h2>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#6B7280'
                }}
              >
                Your payment is encrypted and secure.
              </p>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-4 flex justify-between items-center">
              <span
                className="font-medium"
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#1F2937'
                }}
              >
                Order Total
              </span>
              <span
                className="font-bold"
                style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#18DC1F'
                }}
              >
                ৳{totalPrice}
              </span>
            </div>

            {/* Card Form */}
            <div className="space-y-4">
              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    color: '#1F2937'
                  }}
                >
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#6B7280'
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      color: '#1F2937'
                    }}
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif',
                      color: '#6B7280'
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2"
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      color: '#1F2937'
                    }}
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif',
                      color: '#6B7280'
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    color: '#1F2937'
                  }}
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Manrope, sans-serif',
                    color: '#6B7280'
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setSelectedPayment(null)}
                className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:bg-gray-100 bg-white border-2 border-gray-200"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#111811'
                }}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif',
                  background: '#18DC1F',
                  color: '#FFFFFF',
                  boxShadow: '0px 4px 12px rgba(24, 220, 31, 0.3)'
                }}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Payment Form */}
        {selectedPayment === 'mobile' && (
          <div className="space-y-6">
            <div>
              <h2
                className="font-bold mb-3"
                style={{
                  fontSize: '36px',
                  lineHeight: '45px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#1F2937',
                  letterSpacing: '-1.19px'
                }}
              >
                Mobile Payment
              </h2>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-4 flex justify-between items-center">
              <span
                className="font-medium"
                style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#1F2937'
                }}
              >
                Order Total
              </span>
              <span
                className="font-bold"
                style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#18DC1F'
                }}
              >
                ৳{totalPrice}
              </span>
            </div>

            <div>
              <h3
                className="font-bold mb-4"
                style={{
                  fontSize: '18px',
                  lineHeight: '22.5px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#111811',
                  letterSpacing: '-0.27px'
                }}
              >
                Select your preferred mobile payment method
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* bKash */}
                <button
                  onClick={() => setSelectedProvider('bkash')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    selectedProvider === 'bkash'
                      ? 'border-b-4 border-[#4CAF50] bg-green-50'
                      : 'border-b border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    bK
                  </div>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      fontFamily: 'Manrope, sans-serif',
                      color: selectedProvider === 'bkash' ? '#4CAF50' : '#111811',
                      letterSpacing: '0.21px'
                    }}
                  >
                    bKash
                  </span>
                </button>

                {/* Nagad */}
                <button
                  onClick={() => setSelectedProvider('nagad')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    selectedProvider === 'nagad'
                      ? 'border-b-4 border-[#4CAF50] bg-green-50'
                      : 'border-b border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    N
                  </div>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      fontFamily: 'Manrope, sans-serif',
                      color: selectedProvider === 'nagad' ? '#4CAF50' : '#111811',
                      letterSpacing: '0.21px'
                    }}
                  >
                    Nagad
                  </span>
                </button>

                {/* Rocket */}
                <button
                  onClick={() => setSelectedProvider('rocket')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    selectedProvider === 'rocket'
                      ? 'border-b-4 border-[#4CAF50] bg-green-50'
                      : 'border-b border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: '14px',
                      lineHeight: '21px',
                      fontFamily: 'Manrope, sans-serif',
                      color: selectedProvider === 'rocket' ? '#4CAF50' : '#111811',
                      letterSpacing: '0.21px'
                    }}
                  >
                    Rocket
                  </span>
                </button>
              </div>

              {selectedProvider && (
                <>
                  <div className="mb-6">
                    <h4
                      className="font-bold mb-3"
                      style={{
                        fontSize: '18px',
                        lineHeight: '28px',
                        fontFamily: 'Manrope, sans-serif',
                        color: '#111811'
                      }}
                    >
                      Instructions:
                    </h4>
                    <ol className="space-y-2 list-decimal list-inside text-gray-600"
                      style={{
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontFamily: 'Manrope, sans-serif',
                        color: '#757575'
                      }}
                    >
                      <li>Open your {selectedProvider === 'bkash' ? 'bKash' : selectedProvider === 'nagad' ? 'Nagad' : 'Rocket'} app on your mobile phone.</li>
                      <li>Tap on the &apos;Send Money&apos; option.</li>
                      <li>
                        Enter merchant number: <span className="font-bold" style={{ color: '#18DC1F' }}>01878670666</span>
                      </li>
                      <li>
                        Enter the amount <span className="font-bold" style={{ color: '#18DC1F' }}>৳{totalPrice}</span> and complete the payment.
                      </li>
                      <li>Copy the Transaction ID from your payment confirmation.</li>
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          color: '#1F2937'
                        }}
                      >
                        Your Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').substring(0, 11))}
                        placeholder="01XXXXXXXXX"
                        maxLength={11}
                        className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#6B7280'
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2"
                        style={{
                          fontSize: '16px',
                          lineHeight: '24px',
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          color: '#1F2937'
                        }}
                      >
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value.toUpperCase())}
                        placeholder="Enter transaction ID from your payment"
                        className="w-full px-4 py-4 rounded-3xl border border-[#D1D5DB] focus:outline-none focus:border-[#4CAF50]"
                        style={{
                          fontSize: '16px',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#6B7280'
                        }}
                      />
                      <p className="mt-2 text-sm" style={{ color: '#757575', fontFamily: 'Manrope, sans-serif' }}>
                        Enter the Transaction ID you received after completing the payment
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setSelectedPayment(null)}
                className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:bg-gray-100 bg-white border-2 border-gray-200"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif',
                  color: '#111811'
                }}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  fontSize: '16px',
                  fontFamily: 'Manrope, sans-serif',
                  background: '#18DC1F',
                  color: '#FFFFFF',
                  boxShadow: '0px 4px 12px rgba(24, 220, 31, 0.3)'
                }}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

