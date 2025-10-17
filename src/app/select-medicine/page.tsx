'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import MedicineCard from '@/components/MedicineCard';
import CartIcon from '@/components/CartIcon';
import CartModal from '@/components/CartModal';
import Button from '@/components/Button';
import { medicines } from '@/data/medicines';
import { CartItem } from '@/types/medicine';

export default function SelectMedicinePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Filter medicines based on search query
  const filteredMedicines = useMemo(() => {
    if (!searchQuery.trim()) return medicines;
    return medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate cart totals
  const cartTotals = useMemo(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.medicine.price * item.quantity), 0);
    return { totalItems, totalPrice };
  }, [cart]);

  // Get quantity for a specific medicine
  const getQuantity = (medicineId: string): number => {
    const cartItem = cart.find(item => item.medicine.id === medicineId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Add medicine to cart
  const handleAdd = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return;

    // Check if medicine is in stock
    if (medicine.stock === 0) {
      alert('This medicine is out of stock');
      return;
    }

    setCart(prev => [...prev, { medicine, quantity: 1 }]);
  };

  // Increment quantity
  const handleIncrement = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return;

    const currentItem = cart.find(item => item.medicine.id === medicineId);
    if (!currentItem) return;

    // Check if we can add more
    if (currentItem.quantity >= medicine.stock) {
      alert(`Only ${medicine.stock} items available in stock`);
      return;
    }

    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity
  const handleDecrement = (medicineId: string) => {
    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Handle search
  const handleSearch = () => {
    // Search is already reactive via useMemo
    console.log('Searching for:', searchQuery);
  };

  // Navigate to payment
  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      alert('Please add items to cart before proceeding');
      return;
    }
    // Store cart in sessionStorage for the payment page
    sessionStorage.setItem('cart', JSON.stringify(cart));
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1
            className="font-bold"
            style={{
              fontSize: '30px',
              lineHeight: '36px',
              color: '#1F2937'
            }}
          >
            UIU Smart Pharmacy
          </h1>

          <CartIcon
            itemCount={cartTotals.totalItems}
            onClick={() => setIsCartModalOpen(true)}
          />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredMedicines.map(medicine => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              quantity={getQuantity(medicine.id)}
              onAdd={() => handleAdd(medicine.id)}
              onIncrement={() => handleIncrement(medicine.id)}
              onDecrement={() => handleDecrement(medicine.id)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No medicines found matching <b className="text-[#4CAF50]">{searchQuery}</b>
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Cart Summary */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-xl font-bold text-gray-900">{cartTotals.totalItems}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-xl font-bold text-[#4CAF50]">৳{cartTotals.totalPrice}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-100"
                style={{
                  border: '1px solid #D1D5DB',
                  color: '#374151'
                }}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleProceedToPayment}
                disabled={cart.length === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all !bg-[#4CAF50] ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>

        {/* Spacer for fixed bottom bar */}
        <div className="h-24"></div>
      </div>

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        totalPrice={cartTotals.totalPrice}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onProceedToPayment={() => {
          setIsCartModalOpen(false);
          handleProceedToPayment();
        }}
      />
    </div>
  );
}

