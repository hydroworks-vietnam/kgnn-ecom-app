import { EyeIcon, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import type { IProduct } from '@/types/product';
import useCartStore from '@/store/cart';
import SafetyImage from '@/components/Image/SafetyImage';
import { formatCurrency } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import ProductDetailCard from './ProductDetailCard';
import MobileProductDetailCard from './MobileProductDetailCard';

interface ProductCardFullProps {
  product: IProduct;
  viewMode?: 'grid' | 'list';
}

const ProductCardFull = ({ product, viewMode = 'grid' }: ProductCardFullProps) => {
  const { addCartItem } = useCartStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleAddToCart = (product: IProduct, quantity: number) => {
    const cartItem = { product, options: null, quantity };
    addCartItem(cartItem);
  };

  const discount =
    product.discount_price && product.unit_price
      ? Math.round(((product.unit_price - product.discount_price) / product.unit_price) * 100)
      : 0;

  const rating = 4;
  const reviews = 47;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  const renderColorDots = () => (
    <div className="flex gap-1">
      <span className="w-3 h-3 bg-purple-500 rounded-full" />
      <span className="w-3 h-3 bg-orange-500 rounded-full" />
    </div>
  );

  // const GridView = () => (
  //   <div className="w-fit rounded-lg shadow-md cursor-pointer" onClick={() => setIsPopupOpen(true)}>
  //     <div className="relative">
  //       <SafetyImage
  //         clazz="w-full h-auto rounded-2xl px-1 py-2 object-cover"
  //         src={product.images[0]}
  //         height={200} // Fallback for non-responsive scenarios
  //         width={300}  // Fallback for non-responsive scenarios
  //       />
  //       {discount > 0 && (
  //         <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
  //           {discount}% OFF
  //         </span>
  //       )}
  //     </div>
  //     <div className="p-4 flex flex-col">
  //       <h3 className="text-base font-bold text-gray-900 mb-1 uppercase truncate">{product.name}</h3>
  //       <p className="text-gray-500 text-xs mb-2 truncate">{product.description}</p>
  //       <div className="flex items-center mb-2">
  //         <div className="flex mr-1">{renderStars(rating)}</div>
  //         <span className="text-gray-500 text-xs">({reviews})</span>
  //       </div>
  //       <div className="flex items-center justify-between mt-2">
  //         <div className="flex items-center gap-2">
  //           <span className="font-bold text-gray-900">{formatCurrency(product.unit_price - product.discount_price)}</span>
  //           {discount > 0 && (
  //             <span className="text-sm text-gray-400 line-through">{formatCurrency(product.unit_price)}</span>
  //           )}
  //         </div>
  //         <button
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             handleAddToCart(product, 1);
  //           }}
  //           className="flex items-center gap-2 px-3 py-2 md:px-2 md:py-2 bg-gradient text-white rounded-lg hover:bg-orange-600 text-sm sm:text-base"
  //         >
  //           <ShoppingCartIcon className="w-6 h-6 md:w-4 md:h-4" />
  //           <span className="text-md md:text-sm">Add to cart</span>
  //         </button>
  //       </div>
  //     </div>
  //     {isPopupOpen &&
  //       (isMobile ? (
  //         <MobileProductDetailCard 
  //           product={product}
  //           onClose={() => setIsPopupOpen(false)}
  //           renderStars={renderStars}
  //           handleAddToCart={handleAddToCart}
  //         />
  //       ) : (
  //         <ProductDetailCard
  //           product={product}
  //           onClose={() => setIsPopupOpen(false)}
  //           renderStars={renderStars}
  //           handleAddToCart={handleAddToCart}
  //         />
  //       ))}
  //   </div>
  // );

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
              {discount}% OFF
            </span>
          )}
        </div>
        <div className="p-3 flex flex-col">
          <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase truncate">{product.name}</h3>
          <p className="text-gray-500 text-xs mb-1 truncate">{product.description}</p>
          <div className="flex items-center mb-1">
            <div className="flex mr-1">{renderStars(rating)}</div>
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
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product, 1);
              }}
              className="flex items-center gap-1 px-2 py-1 bg-gradient text-white rounded-lg hover:bg-orange-600 text-xs"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
        {isPopupOpen &&
          (isMobile ? (
            <MobileProductDetailCard
              product={product}
              onClose={() => setIsPopupOpen(false)}
              renderStars={renderStars}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <ProductDetailCard
              product={product}
              onClose={() => setIsPopupOpen(false)}
              renderStars={renderStars}
              handleAddToCart={handleAddToCart}
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
          <div className="flex">{renderStars(rating)}</div>
          {renderColorDots()}
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
          renderStars={renderStars}
          handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );

  return viewMode === 'grid' ? <GridView /> : <ListView />;
};

export default ProductCardFull;