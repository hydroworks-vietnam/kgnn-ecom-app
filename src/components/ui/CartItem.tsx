// src/components/CartDrawer/CartItem.tsx
import useCartStore from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { name, images, unit_price } = product;
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

  const handleIncrease = () => {
    increaseQuantity(product.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(product.id);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <SafetyImage
        src={images?.[0]}
        alt={name}
        height={64}
        width={64}
        clazz="rounded-lg w-16 h-16 object-contain bg-gray-50 p-2"
      />

      {/* Product Details */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        {/* <p className="text-xs text-gray-500">
          {color} {storage && `| ${storage}`} {connectivity && `| ${connectivity}`}
        </p> */}

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handleDecrease}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="text-sm text-gray-900">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(unit_price * quantity)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;