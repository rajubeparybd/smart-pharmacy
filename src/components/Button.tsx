import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "w-full hover:cursor-pointer max-w-[448px] h-[68px] rounded-[24px] font-bold flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]";
  
  const variantStyles: Record<ButtonVariant, { style: React.CSSProperties }> = {
    primary: {
      style: {
        background: '#18DC1F',
        color: '#FFFFFF',
        fontSize: '20px',
        lineHeight: '28px',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)'
      }
    },
    secondary: {
      style: {
        background: '#FFFFFF',
        color: '#1F2937',
        fontSize: '20px',
        lineHeight: '28px',
        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)'
      }
    }
  };

  return (
    <button
      className={`${baseStyles} ${className}`}
      style={variantStyles[variant].style}
      {...props}
    >
      {children}
    </button>
  );
}

