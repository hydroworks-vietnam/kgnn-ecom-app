import React from 'react';

export const GoogleAdsIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Blue Slant */}
      <path
        d="M15.5 3.5L4.5 20.5C4.2 21 4.5 21.5 5 21.5H11.5L22.5 4.5C22.8 4 22.5 3.5 22 3.5H15.5Z"
        fill="#4285F4"
      />
      {/* Yellow Slant */}
      <path
        d="M8.5 3.5L1.5 14.5C1.2 15 1.5 15.5 2 15.5H9L16 4.5C16.3 4 16 3.5 15.5 3.5H8.5Z"
        fill="#FBBC04"
      />
    </svg>
  );
};
