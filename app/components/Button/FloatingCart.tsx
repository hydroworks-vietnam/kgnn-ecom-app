import { useStore } from '@nanostores/react';
import { totalCartQuantity } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartProps {
  onCartClick: () => void;
}

const FloatingCart = ({ onCartClick }: FloatingCartProps) => {
  const $totalQuantity = useStore(totalCartQuantity);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
          onClick={onCartClick}
          className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {$totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center">
              {$totalQuantity}
            </span>
          )}
        </button>
    </div>
  );
};

export default FloatingCart;
