import { cx } from 'class-variance-authority';
import { Input } from '@/components/Input/BasicInput';
import { useRef, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash-es';

interface QuantityControlProps {
  quantity: number;
  onIncrease: (value: number) => void;
  onDecrease: (value: number) => void;
  onQuantityChange?: (value: number) => void;
  size?: 'sm' | 'md';
  textSize?: string;
  className?: string;
}

export default function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
  onQuantityChange,
  size = 'sm',
  className = '',
  textSize = ''
}: QuantityControlProps) {
  const MAX_QUANTITY = 999;
  const buttonSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(quantity.toString());

  const debouncedQuantityChange = useCallback(
    debounce((value: number) => {
      onQuantityChange?.(value);
    }, 500),
    [onQuantityChange]
  );

  useEffect(() => {
    setInputValue(quantity.toString());
    debouncedQuantityChange.cancel();
  }, [quantity, debouncedQuantityChange]);

  const commitQuantity = (rawValue: string) => {
    const parsed = parseInt(rawValue, 10);
    const finalValue = isNaN(parsed) || parsed < 0 ? 0 : Math.min(parsed, MAX_QUANTITY);
    setInputValue(finalValue.toString());
    debouncedQuantityChange.cancel();
    onQuantityChange?.(finalValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputValue(val);
      const parsed = parseInt(val, 10);
      const finalValue = isNaN(parsed) ? 0 : Math.min(parsed, MAX_QUANTITY);
      debouncedQuantityChange(finalValue);
    }
  };

  const handleInputBlur = () => {
    commitQuantity(inputValue);
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          const newValue = Math.max(0, quantity - 1);
          setInputValue(newValue.toString());
          onDecrease(newValue);
          debouncedQuantityChange.cancel();
          onQuantityChange?.(newValue);
        }}
        className={cx(
          buttonSize,
          'aspect-square flex items-center justify-center border-2 border-primary text-white bg-primary rounded-full',
          quantity <= 0 && 'cursor-not-allowed opacity-50'
        )}
        disabled={quantity === 0}
      >
        -
      </button>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onClick={(e) => e.stopPropagation()}
        className={cx(
          `${textSize} text-center h-8 w-12 px-0 py-0 rounded-md shadow-none`,
          textSize === 'text-xs' ? 'text-xs' : 'text-sm'
        )}
        ref={inputRef}
        inputMode="numeric"
        pattern="\d*"
        type="text"
      />
      <button
        onClick={() => {
          const newValue = Math.min(quantity + 1, MAX_QUANTITY);
          setInputValue(newValue.toString());
          onIncrease(newValue);
          debouncedQuantityChange.cancel();
          onQuantityChange?.(newValue);
        }}
        className={cx(
          buttonSize,
          'aspect-square flex items-center justify-center border-2 border-primary text-white bg-primary rounded-full',
          quantity >= MAX_QUANTITY && 'cursor-not-allowed opacity-50'
        )}
        disabled={quantity >= MAX_QUANTITY}
      >
        +
      </button>
    </div>
  );
}