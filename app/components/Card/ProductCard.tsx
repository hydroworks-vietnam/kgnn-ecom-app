import { useState } from 'react';
import type { IProduct } from '@/types/product';
import { formatCurrency } from '@/utils/helpers';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCart } from 'lucide-react';
import QuantityControl from '@/components/ui/QuantityControl';
import useCartStore from '@/store/cart';

interface ProductCardProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
  onClick?: () => void;
}

const ProductCard = ({ product, onAddToCart, onClick }: ProductCardProps) => {
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
    }, 1000);
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
      className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {product.images?.[0] && (
          <SafetyImage
            src={product.images[0]}
            alt={product.name}
          />
        )}

        {product.price_variants && product.price_variants.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {product.price_variants.map((_, index) => (
              <div
                key={index}
                className="w-3 h-1.5 rounded-full bg-emerald-500"
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 h-14">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-3">{product.unit}</p>

        <p className="text-base font-bold text-primary mt-2">
          {formatCurrency(product.unit_price)}
        </p>

        <div className="mt-4 space-y-3 relative">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium">Số lượng:</label>
            <QuantityControl quantity={quantity} onQuantityChange={handleQuantityChange} />
          </div>

          {showPopup && (
            <div className="absolute -top-2 left-3/4 z-50 animate-in zoom-in-50">
              <div className="bg-orange-500 text-white p-2 rounded-full shadow-2xl animate-bounce">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={quantity === 0}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium ${
              quantity === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
