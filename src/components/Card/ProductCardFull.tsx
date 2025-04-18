import { EyeIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import type { IProduct } from '@/types/product';
import SafetyImage from '@/components/Image/SafetyImage';
import { formatCurrency } from '@/utils/helpers';
import { useEffect, useState, useRef } from 'react';
import ProductDetailCard from './ProductDetailCard';
import MobileProductDetailCard from './MobileProductDetailCard';
import ReviewStar from '../Review/Star';
import useCartStore, { isAddCartAnimationFinished, isCartOpen } from '@/store/cart';
import { useStore } from '@nanostores/react';

interface ProductCardFullProps {
  product: IProduct;
  viewMode?: 'grid' | 'list';
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const ProductCardFull = ({ product, viewMode = 'grid', onAddToCart }: ProductCardFullProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addCartItem } = useCartStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimationFinished = useStore(isAddCartAnimationFinished);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimationFinished) return;
    
    // Get button position for animation start point
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (buttonRect) {
      const event = new CustomEvent('add-to-cart-animation', {
        detail: {
          x: buttonRect.right,
          y: buttonRect.top + buttonRect.height / 2
        }
      });
      window.dispatchEvent(event);
    }
    
    onAddToCart(product, 1);
  };

  const onBuyItNow = (product: IProduct, quantity: number) => {
    addCartItem({
      product,
      quantity,
      options: {},
    });
    setIsPopupOpen(false);
    isCartOpen.set(true);
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const discount =
    product.discount_price
      ? Math.round(((product.unit_price - product.discount_price) / product.unit_price) * 100)
      : 0;

  const rating = 4;
  const reviews = 47;

  const GridView = () => (
    <div className="h-full" 
      onClick={() => setIsPopupOpen(true)}
    >
      <div className="rounded-lg shadow-md hover:shadow-lg cursor-pointer h-full flex flex-col">
        <div className="relative w-full h-50">
          <SafetyImage
            clazz="h-[180px] w-full md:h-full rounded-t-lg object-cover"
            src={product.images[0]}
            height={200}
            width={300}
          />
          {discount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[11px] md:text-xs font-semibold p-1 rounded">
              Giảm {discount}%
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase truncate">{product.name}</h3>
          <p className="text-gray-500 text-xs mb-1 truncate">{product.description}</p>
          <div className="flex items-center mb-1">
            <div className="flex mr-1">
              <ReviewStar rating={rating} />
            </div>
            <span className="text-gray-500 text-xs">({reviews})</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm text-gray-900">{formatCurrency(product.unit_price - product.discount_price)}</span>
              {discount > 0 && (
                <span className="text-xs text-gray-400 line-through">{formatCurrency(product.unit_price)}</span>
              )}
            </div>
            <button
              ref={buttonRef}
              onClick={handleAddToCart}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs transition-all ${
                !isAnimationFinished 
                  ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                  : 'bg-gradient text-white hover:bg-orange-600'
              }`}
              disabled={!isAnimationFinished}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Thêm vào giỏ</span>
            </button>
          </div>
        </div>
        {isPopupOpen &&
          (isMobile ? (
            <MobileProductDetailCard
              product={product}
              onClose={() => setIsPopupOpen(false)}
              handleAddToCart={onAddToCart}
              handleBuyItNow={onBuyItNow}
            />
          ) : (
            <ProductDetailCard
              product={product}
              onClose={() => setIsPopupOpen(false)}
              handleAddToCart={onAddToCart}
              handleBuyItNow={onBuyItNow}
            />
          ))}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="w-full flex items-center gap-3 rounded-lg shadow-md bg-white p-3 cursor-pointer" 
      onClick={() => setIsPopupOpen(true)}
    >
      <div className="flex-shrink-0">
        <SafetyImage
          clazz="w-32 h-32 rounded object-cover"
          src={product.images[0]}
          height={150}
          width={150}
        />
      </div>
      <div className="flex-1 px-4 py-3 flex flex-col justify-center">
        <h3 className="text-sm font-bold text-blue-900 uppercase mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-blue-900">{formatCurrency(product.unit_price - product.discount_price)}</span>
          {discount > 0 && (
            <span className="text-gray-400 line-through text-sm">{formatCurrency(product.unit_price)}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            <ReviewStar rating={rating} />
          </div>
        </div>
        <p className="text-gray-500 text-sm truncate">{product.description}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button className="text-blue-900 hover:text-primary cursor-pointer">
            <ShoppingCartIcon className="w-4 h-4"/>
          </button>
          <button className="text-blue-900 hover:text-primary cursor-pointer">
            <HeartIcon className="w-4 h-4"/>
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <ProductDetailCard
          product={product}
          onClose={() => setIsPopupOpen(false)}
          handleAddToCart={onAddToCart}
          handleBuyItNow={onBuyItNow}
        />
      )}
    </div>
  );

  return viewMode === 'grid' ? <GridView /> : <ListView />;
};

export default ProductCardFull;