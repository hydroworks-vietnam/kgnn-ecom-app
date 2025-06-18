import { EyeIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import type { IProduct } from '@/types/product';
import SafetyImage from '@/components/Image/SafetyImage';
import { cn, formatCurrency } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import ProductDetailCard from './ProductDetailCard';
import MobileProductDetailCard from './MobileProductDetailCard';
import useCartStore, { isCartOpen } from '@/store/cart';
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
  const cartQuantity = getCartItemQuantity(product.id);
  const [quantity, setQuantity] = useState(cartQuantity);

  const handleIncrease = (v: number) => {
    setQuantity(v);
    addCartItem({ product, quantity: v, options: {} });
  };

  const handleDecrease = (v: number) => {
    setQuantity(v);
    addCartItem({ product, quantity: v, options: {} });
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    addCartItem({ product, quantity: value, options: {} });
  };

  const onBuyItNow = (product: IProduct, quantity: number) => {
    console.log('onBuyItNow:', { productId: product.id, quantity });
    addCartItem({ product, quantity, options: {} });
    setIsPopupOpen(false);
    isCartOpen.set(true);
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  const GridView = () => (
    <div className="rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col aspect-square w-full" 
      onClick={() => setIsPopupOpen(true)}
    >
      <div className="relative w-full flex-1">
        <SafetyImage
          clazz={cn(
            isMobile ? "h-32 w-full" : "h-56 w-full", // Adjusted for mobile to maintain square
            "rounded-t-lg object-cover"
          )}
          src={product.images[0]}
        />
      </div>
      <div className="md:p-2 flex flex-col flex-1 space-y-1 px-4 py-2">
        <h3 className="text-md font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        {isMobile ? (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-primary">
              {formatCurrency(product.unit_price)}
            </span>
            <div className="flex justify-end">
              <QuantityControl
                quantity={quantity}
                onIncrease={v => handleIncrease(v)}
                onDecrease={v => handleDecrease(v)}
                onQuantityChange={handleQuantityChange}
                size="sm"
                className="scale-90"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-md text-primary">
                {formatCurrency(product.unit_price)}
              </span>
            </div>
            <QuantityControl
              quantity={quantity}
              onIncrease={v => handleIncrease(v)}
              onDecrease={v => handleDecrease(v)}
              onQuantityChange={handleQuantityChange}
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
  );

  const ListView = () => (
    <div className="w-full flex items-center gap-3 rounded-lg shadow-md bg-white p-3 cursor-pointer" onClick={() => setIsPopupOpen(true)}>
      <div className="flex-shrink-0">
        <SafetyImage
          clazz="w-32 h-32 rounded object-cover"
          src={product.images[0]}
          height={150}
          width={150}
        />
      </div>
      <div className="md:flex-1 px-4 py-3 flex flex-col justify-center">
        <h3 className="text-sm font-bold text-blue-900 uppercase mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-blue-900">{formatCurrency(product.unit_price)}</span>
        </div>
        <p className="text-gray-500 text-sm truncate">{product.description}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button className="text-blue-900 hover:text-primary cursor-pointer">
            <ShoppingCartIcon className="w-4 h-4" />
          </button>
          <button className="text-blue-900 hover:text-primary cursor-pointer">
            <HeartIcon className="w-4 h-4" />
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