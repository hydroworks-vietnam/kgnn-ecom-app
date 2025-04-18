// src/components/CartDrawer/CartItem.tsx
import useCartStore from '@/store/cart';
import type { ICartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { X } from 'lucide-react';

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
    <div className="flex items-start gap-4 p-2 border border-gray-100 rounded-lg">
      <div className="relative w-24 h-24">
        <SafetyImage
          clazz="w-full h-full rounded-md object-cover"
          src={images?.[0]}
          height={96}
          width={96}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between gap-2">
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
      <div className="flex flex-col items-end justify-between h-24">
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
        <span className="text-sm font-medium text-gray-900">
          {formatCurrency(unit_price * quantity)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;