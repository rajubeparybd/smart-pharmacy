interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export default function CartIcon({ itemCount, onClick }: CartIconProps) {
  return (
    <button
      onClick={onClick}
      className="relative transition-all hover:scale-110 active:scale-95 hover:cursor-pointer"
    >
      {/* Cart Icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
      >
        <path
          d="M7 8L10 8L12.68 21.39C12.7715 21.8504 13.0184 22.264 13.3785 22.5583C13.7386 22.8526 14.1897 23.0097 14.65 23H27.4C27.8603 23.0097 28.3114 22.8526 28.6715 22.5583C29.0316 22.264 29.2785 21.8504 29.37 21.39L31 13H11"
          stroke="#374151"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="28" r="2" fill="#374151" />
        <circle cx="27" cy="28" r="2" fill="#374151" />
      </svg>

      {/* Badge */}
      {itemCount > 0 && (
        <div
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: '#4CAF50'
          }}
        >
          <span
            className="font-bold"
            style={{
              fontSize: '12px',
              lineHeight: '16px',
              color: '#FFFFFF'
            }}
          >
            {itemCount}
          </span>
        </div>
      )}
    </button>
  );
}

