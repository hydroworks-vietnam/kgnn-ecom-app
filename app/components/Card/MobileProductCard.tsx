import { useState } from 'react';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCart } from 'lucide-react';
import QuantityControl from '@/components/ui/QuantityControl';
import useCartStore from '@/store/cart';

interface MobileProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
  onClick?: () => void;
}

const MobileProductCard = ({ product, onAddToCart, onClick }: MobileProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const { addCartItem } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdding || quantity === 0) return;
    setIsAdding(true);
    addCartItem({ product, quantity });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsAdding(false);
    }, 2000);
    onAddToCart(product, quantity);
  };

  const handleClick = () => {
    onClick?.();
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:cursor-pointer relative"
      onClick={handleClick}
    >
      {showPopup && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 animate-in zoom-in-50 duration-300">
          <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-2xl animate-bounce">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
      )}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <SafetyImage
          clazz="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product.images?.[0]}
          height={400}
          width={400}
        />
      </div>

      <div className="p-3">
        <h3 className="text-xs font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-primary">
            {formatCurrency(product.unit_price)}
          </span>
          <span className="text-xs text-gray-500">
            {product.unit}
          </span>
        </div>

        <div className="flex items-center gap-2 relative">
          <QuantityControl quantity={quantity} onQuantityChange={handleQuantityChange} />
          
          {showPopup && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 animate-in zoom-in-50 duration-300">
              <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-2xl animate-bounce">
                <ShoppingCart className="w-5 h-5" />
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isAdding || quantity === 0}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 text-xs ${
              isAdding || quantity === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isAdding ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" />
                <span>Giỏ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
