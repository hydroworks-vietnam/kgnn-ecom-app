import { useStore } from '@nanostores/react';
import { isAddCartAnimationFinished } from '@/store/cart';
import { cx } from 'class-variance-authority';

interface QuantityControlProps {
  quantity: number;
  onIncrease: (e: React.MouseEvent) => void;
  onDecrease: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
  textSize?: string;
  className?: string;
}

export default function QuantityControl({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  size = 'sm',
  className = '',
  textSize = ''
}: QuantityControlProps) {
  const isAnimationFinished = useStore(isAddCartAnimationFinished);
  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';

  return (
    <div className={`flex items-center gap-1 ${className}`} onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onDecrease}
        className={`${buttonSize} aspect-square text- flex items-center justify-center border-2 border-primary text-white bg-primary rounded-full hover:opacity-80
        ${!isAnimationFinished || quantity <= 0 ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={!isAnimationFinished || quantity <= 0}
      >
        -
      </button>
      <span className={cx(`${textSize} text-gray-900 text-center`, textSize === 'text-xs' ? 'w-8' : 'w-5')}>{quantity}</span>
      <button
        onClick={onIncrease}
        className={`${buttonSize} aspect-square text-md flex items-center justify-center border-2 border-primary text-white bg-primary rounded-full hover:opacity-80 ${
          !isAnimationFinished ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={!isAnimationFinished}
      >
        +
      </button>
    </div>
  );
} 