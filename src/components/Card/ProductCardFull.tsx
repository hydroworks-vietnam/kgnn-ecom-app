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
import QuantityControl from '@/components/ui/QuantityControl';

interface ProductCardFullProps {
  product: IProduct;
  viewMode?: 'grid' | 'list';
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const ProductCardFull = ({ product, viewMode = 'grid', onAddToCart }: ProductCardFullProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { addCartItem, getCartItemQuantity } = useCartStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimationFinished = useStore(isAddCartAnimationFinished);
  const cartQuantity = getCartItemQuantity(product.id);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (isAnimationFinished) {
      setQuantity(cartQuantity);
    }
  }, [cartQuantity, isAnimationFinished]);

  const triggerAnimation = (buttonRect: DOMRect) => {
    const event = new CustomEvent('add-to-cart-animation', {
      detail: {
        x: buttonRect.right,
        y: buttonRect.top + buttonRect.height / 2
      }
    });
    window.dispatchEvent(event);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimationFinished) return;
    onAddToCart(product, 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimationFinished) return;
    if (quantity >= 1) {
      onAddToCart(product, -1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAnimationFinished) return;
    
    // Get button position for animation start point
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (buttonRect) {
      triggerAnimation(buttonRect);
    }
    
    onAddToCart(product, quantity);
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
        <div className="relative w-full aspect-square">
          <SafetyImage
            clazz="w-full h-full rounded-t-lg object-cover"
            src={product.images[0]}
            height={300}
            width={300}
          />
          {discount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded">
              Giảm {discount}%
            </span>
          )}
        </div>
        <div className="p-2 flex flex-col flex-1">
          <h3 className="text-[14px] font-bold text-gray-900 mb-0.5">{product.name}</h3>
          <p className="text-gray-500 text-[12px] mb-0.5 line-clamp-2">{product.description}</p>
          {/* <div className="flex items-center gap-1 mb-1">
            <div className="flex mr-0.5">
              <ReviewStar rating={rating} />
            </div>
            <span className="text-gray-500 text-[10px]">({reviews})</span>
          </div> */}
          {isMobile ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-gray-900">
                  {formatCurrency(product.unit_price - product.discount_price)}
                </span>
                {discount > 0 && (
                <span className="text-xs text-primary line-through">
                  {formatCurrency(product.unit_price)}
                </span>
                )}
              </div>
              <div className="flex justify-end">
                <QuantityControl
                  quantity={quantity}
                  onIncrease={(e) => handleIncrease(e)}
                  onDecrease={(e) => handleDecrease(e)}
                  size="sm"
                  className="scale-90 origin-right"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-0.5">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[13px] text-gray-900">{formatCurrency(product.unit_price - product.discount_price)}</span>
                {discount > 0 && (
                <span className="text-[13px] text-primary line-through">{formatCurrency(product.unit_price)}</span>
                )}
              </div>
              <QuantityControl
                quantity={quantity}
                onIncrease={(e) => handleIncrease(e)}
                onDecrease={(e) => handleDecrease(e)}
                size="sm"
                className="scale-90 origin-right"
              />
            </div>
          )}
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
            <span className="text-primary line-through text-sm">{formatCurrency(product.unit_price)}</span>
          )}
        </div>
        {/* <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            <ReviewStar rating={rating} />
          </div>
        </div> */}
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