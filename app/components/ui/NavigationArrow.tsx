import { useState } from 'react';

interface NavigationArrowProps {
  onClick: () => void;
  disabled?: boolean;
  direction: 'left' | 'right';
}

const NavigationArrow = ({ onClick, disabled = false, direction }: NavigationArrowProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        direction === 'left' ? 'transform -scale-x-100' : ''
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-800"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
};

export default NavigationArrow;
