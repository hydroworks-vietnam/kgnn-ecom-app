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
    <div
      className="rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col w-full bg-white transition-all duration-300"
      onClick={() => setIsPopupOpen(true)}
    >
      <div className="relative w-full overflow-hidden px-2 py-3">
        <SafetyImage
          clazz={cn(
            isMobile ? "w-full h-[150px]" : "w-full h-72",
            "rounded-lg object-cover transition-opacity duration-300 hover:opacity-90"
          )}
          src={product.images[0]}
        />
      </div>
      <div className="md:px-4 flex flex-col flex-1 space-y-1 px-3">
        <h3 className="text-md font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
        {isMobile ? (
        <>
          <span className="font-bold text-primary">
            {formatCurrency(product.unit_price)}
          </span>
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onQuantityChange={handleQuantityChange}
            size="sm"
            className="scale-90 self-end py-2"
          />
        </>
        ) : (
        <div className="flex items-center justify-between pb-3">
          <span className="font-bold text-md text-primary">
            {formatCurrency(product.unit_price)}
          </span>
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onQuantityChange={handleQuantityChange}
            size="sm"
            className="scale-90"
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