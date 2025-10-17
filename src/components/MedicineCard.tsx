'use client';

import { Medicine } from '@/types/medicine';

interface MedicineCardProps {
  medicine: Medicine;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function MedicineCard({
  medicine,
  quantity,
  onAdd,
  onIncrement,
  onDecrement
}: MedicineCardProps) {
  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const canAddMore = quantity < medicine.stock;

  return (
    <div
      className={`flex flex-col items-center p-6 rounded-2xl transition-all hover:shadow-lg ${
        isOutOfStock ? 'opacity-60' : ''
      }`}
      style={{
        background: '#FFFFFF',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* Medicine Icon */}
      <div className="mb-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
            fill="#4CAF50"
            opacity="0.2"
          />
          <path
            d="M28 16H20C18.8954 16 18 16.8954 18 18V30C18 31.1046 18.8954 32 20 32H28C29.1046 32 30 31.1046 30 30V18C30 16.8954 29.1046 16 28 16Z"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 20V28M20 24H28"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Medicine Name */}
      <h3
        className="font-bold text-center mb-2"
        style={{
          fontSize: '18px',
          lineHeight: '28px',
          color: '#1F2937'
        }}
      >
        {medicine.name}
      </h3>

      {/* Price */}
      <p
        className="font-normal text-center mb-2"
        style={{
          fontSize: '16px',
          lineHeight: '24px',
          color: '#4B5563'
        }}
      >
        ৳{medicine.price} per {medicine.unit}
      </p>

      {/* Stock Status */}
      <div className="mb-4 min-h-[24px]">
        {isOutOfStock ? (
          <span
            className="font-semibold px-3 py-1 rounded-full"
            style={{
              fontSize: '12px',
              background: '#FEE2E2',
              color: '#DC2626'
            }}
          >
            Out of Stock
          </span>
        ) : isLowStock ? (
          <span
            className="font-semibold px-3 py-1 rounded-full"
            style={{
              fontSize: '12px',
              background: '#FEF3C7',
              color: '#D97706'
            }}
          >
            Only {medicine.stock} left
          </span>
        ) : (
          <span
            className="font-normal text-xs"
            style={{
              color: '#6B7280'
            }}
          >
            In Stock: {medicine.stock}
          </span>
        )}
      </div>

      {/* Quantity Controls or Add Button */}
      {quantity === 0 ? (
        <button
          onClick={onAdd}
          disabled={isOutOfStock}
          className={`w-full px-6 py-2 rounded-lg font-semibold transition-all ${
            isOutOfStock 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-105 active:scale-95'
          }`}
          style={{
            background: isOutOfStock ? '#9CA3AF' : '#4CAF50',
            color: '#FFFFFF',
            fontSize: '14px',
            lineHeight: '20px'
          }}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          {/* Decrement Button */}
          <button
            onClick={onDecrement}
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all hover:scale-110 active:scale-95"
            style={{
              background: '#E5E7EB',
              color: '#374151',
              fontSize: '18px'
            }}
          >
            -
          </button>

          {/* Quantity */}
          <span
            className="font-semibold min-w-[24px] text-center"
            style={{
              fontSize: '18px',
              lineHeight: '28px',
              color: '#1F2937'
            }}
          >
            {quantity}
          </span>

          {/* Increment Button */}
          <button
            onClick={onIncrement}
            disabled={!canAddMore}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
              canAddMore ? 'hover:scale-110 active:scale-95' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              background: canAddMore ? '#4CAF50' : '#9CA3AF',
              color: '#FFFFFF',
              fontSize: '18px'
            }}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

