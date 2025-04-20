import { useStore } from '@nanostores/react';
import { isAddCartAnimationFinished } from '@/store/cart';

interface QuantityControlProps {
  quantity: number;
  onIncrease: (e: React.MouseEvent) => void;
  onDecrease: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export default function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  size = 'sm',
  className = ''
}: QuantityControlProps) {
  const isAnimationFinished = useStore(isAddCartAnimationFinished);
  
  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div className={`flex items-center gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onDecrease}
        className={`${buttonSize} flex items-center justify-center border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 ${
          !isAnimationFinished ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={!isAnimationFinished}
      >
        -
      </button>
      <span className={`${textSize} text-gray-900 w-7 text-center font-medium`}>{quantity}</span>
      <button
        onClick={onIncrease}
        className={`${buttonSize} flex items-center justify-center border-2 border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 ${
          !isAnimationFinished ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={!isAnimationFinished}
      >
        +
      </button>
    </div>
  );
} 