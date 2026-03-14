interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

const QuantityControl = ({ quantity, onQuantityChange, min = 0, max = 10 }: QuantityControlProps) => {
  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div 
      className="flex items-center" 
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleDecrease}
        disabled={quantity <= min}
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-gray-700 font-semibold">-</span>
      </button>
      <span className="w-10 text-center font-semibold text-primary">{quantity}</span>
      <button
        onClick={handleIncrease}
        disabled={quantity >= max}
        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-gray-700 font-semibold">+</span>
      </button>
    </div>
  );
};

export default QuantityControl;
