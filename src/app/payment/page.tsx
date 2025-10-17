'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { CartItem } from '@/types/medicine';

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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
      <div className="max-w-3xl mx-auto px-4">
        <h1
          className="font-bold mb-8"
          style={{
            fontSize: '30px',
            lineHeight: '36px',
            color: '#1F2937'
          }}
        >
          Payment Summary
        </h1>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{item.medicine.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  ৳{item.medicine.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Amount</span>
            <span className="text-[#4CAF50]">৳{totalPrice}</span>
          </div>
        </div>

        {/* Payment Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            📌 This is a demo payment page. In production, you would integrate with a payment gateway like bKash, Nagad, or Stripe.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-100"
            style={{
              border: '1px solid #D1D5DB',
              color: '#374151'
            }}
            disabled={isProcessing}
          >
            Back to Cart
          </button>
          <Button
            variant="primary"
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1"
          >
            {isProcessing ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
}

