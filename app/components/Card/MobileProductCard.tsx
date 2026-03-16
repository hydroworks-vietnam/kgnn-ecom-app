import { useState } from 'react';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCart } from 'lucide-react';
import QuantityControl from '@/components/ui/QuantityControl';
import useCartStore from '@/store/cart';
import Spinner from '../Spinner';

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
    }, 300);
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
        <h3 className="text-[11px] leading-tight font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.2rem]">
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

        <div className="flex flex-col gap-2 relative">
          <div className="flex justify-around">
            <QuantityControl quantity={quantity} onQuantityChange={handleQuantityChange} />
          </div>
          
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
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 text-xs font-medium ${
              isAdding || quantity === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            {isAdding ? (
              <Spinner />
            ) : (
              <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Thêm vào giỏ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCard;
