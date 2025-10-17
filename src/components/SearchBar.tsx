'use client';

import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex gap-4 w-full">
      {/* Search Input */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for medicine..."
          className="w-full h-[50px] px-[41px] py-[14px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
          style={{
            border: '1px solid #D1D5DB',
            background: '#FFFFFF',
            fontSize: '16px',
            color: '#6B7280'
          }}
        />
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="px-6 py-[13px] rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
        style={{
          background: '#4CAF50',
          color: '#FFFFFF',
          fontSize: '16px',
          lineHeight: '24px',
          minWidth: '102px'
        }}
      >
        Search
      </button>
    </div>
  );
}

