'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CartItem } from '@/types/medicine';

type PaymentMethod = 'card' | 'mobile' | null;

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);

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
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart
    sessionStorage.removeItem('cart');
    
    // Show success message
    alert('Payment successful! Your order has been placed.');
    
    // Redirect to home
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h1
          className="font-bold mb-8 text-center"
          style={{
            fontSize: '32px',
            lineHeight: '32px',
            fontFamily: 'Manrope, sans-serif',
            color: '#111811'
          }}
        >
          <span style={{ color: '#9CA3AF' }}>💰 </span>
          <span style={{ color: '#4CAF50' }}>Payment</span>
          <span style={{ color: '#9CA3AF' }}> 💰</span>
        </h1>

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
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                selectedPayment === 'card'
                  ? 'bg-[#4CAF50] text-white border-2 border-[#4CAF50]'
                  : 'bg-white text-[#4CAF50] border-2 border-[#4CAF50]'
              }`}
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
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                selectedPayment === 'mobile'
                  ? 'bg-[#111811] text-white border-2 border-[#111811]'
                  : 'bg-white text-[#111811] border-2 border-[#E5E7EB]'
              }`}
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

          {/* Payment Method Icons */}
          {selectedPayment === 'mobile' && (
            <div className="flex gap-4 justify-center items-center">
              <div className="text-sm text-gray-500 font-medium">
                Supports: bKash, Nagad, Rocket
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-4 rounded-2xl font-bold transition-all hover:bg-gray-100"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif',
              border: '2px solid #E5E7EB',
              color: '#111811'
            }}
            disabled={isProcessing}
          >
            Back to Cart
          </button>
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 py-4 rounded-2xl font-bold"
            style={{
              fontSize: '16px',
              fontFamily: 'Manrope, sans-serif'
            }}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}

