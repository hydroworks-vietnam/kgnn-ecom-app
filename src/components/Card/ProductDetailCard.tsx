import { useMemo, useState, useCallback, useEffect, memo } from 'react';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCartIcon, X, History, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import type { IProduct } from '@/types/product';
import { cn, formatCurrency } from '@/utils/helpers';
import useCartStore from '@/store/cart';
import YoutubeVideo from '@/components/ui/YoutubeVideo';
import { useVideoSource } from '@/hooks/useVideoSource';
import QuantityControl from '@/components/ui/QuantityControl';
import { isCartOpen } from '@/store/cart';
import { useStore } from '@nanostores/react';

// Memoized VideoSection to prevent re-rendering
const VideoSection = memo(({ videoSrc, productDescription }: { videoSrc: string | null; productDescription: string }) => {
  return (
    <div>
      <p className="text-gray-700 text-sm">{productDescription}</p>
      {videoSrc && (
        <div className="relative rounded-lg overflow-hidden mt-8 z-0">
          <YoutubeVideo src={videoSrc} />
        </div>
      )}
    </div>
  );
});

// Ensure VideoSection doesn't re-render unnecessarily
VideoSection.displayName = 'VideoSection';

type ProductDetailCardProps = {
  product: IProduct;
  onClose: () => void;
  handleAddToCart: (product: IProduct, quantity: number) => void;
  handleBuyItNow: (product: IProduct, quantity: number) => void;
}

export default function ProductDetailCard(props: ProductDetailCardProps) {
  const { product, onClose, handleAddToCart, handleBuyItNow } = props;
  const { addCartItem, getCartItemQuantity } = useCartStore();
  const $isCartOpen = useStore(isCartOpen);
  // Track cart quantity to compare with local quantity
  const cartQuantity = getCartItemQuantity(product.id);
  const [quantity, setQuantity] = useState(cartQuantity);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');

  const getTextSizeClass = (num: number): string => {
    const length = num.toString().length;
    if (length >= 4) return 'text-xs';
    return 'text-sm';
  };

  const textSizeClass = useMemo(() => getTextSizeClass(quantity), [quantity]);
  const videoSrc = useVideoSource(product.video_link);

  // Image slider functions
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  // Quantity control handlers (update local state only)
  const handleIncrease = useCallback((v: number) => {
    setQuantity(v);
  }, [product.id]);

  const handleDecrease = useCallback((v: number) => {
    setQuantity(v);
  }, [product.id]);

  const handleQuantityChange = useCallback((value: number) => {
    setQuantity(value);
  }, [product.id]);

  const handleAddToCartClick = useCallback(() => {
    addCartItem({ product, quantity, options: {} });
    handleAddToCart(product, quantity);
  }, [product, quantity, addCartItem, handleAddToCart]);

  const handleBuyNowClick = useCallback(() => {
    addCartItem({ product, quantity, options: {} });
    handleBuyItNow(product, quantity);
  }, [product, quantity, addCartItem, handleBuyItNow]);

  // Memoize the quantity display
  const quantityDisplay = useMemo(() => (
    <div className="flex items-center">
      <QuantityControl
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onQuantityChange={handleQuantityChange}
        size="md"
        textSize={textSizeClass}
      />
    </div>
  ), [quantity, handleIncrease, handleDecrease, handleQuantityChange, textSizeClass]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center",
        $isCartOpen && "hidden"
      )}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 40,
        pointerEvents: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-[50%] h-[90%] relative shadow-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 isolate"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-1 right-0 border-2 border-red-500 hover:text-red-700 hover:border-red-700 rounded-full p-1"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>

        <div className="flex items-center justify-between my-4">
          <h2 className="text-xl font-bold text-blue-900 uppercase ml-3">
            {product.name}
          </h2>
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        </div>

        <div className="flex gap-10">
          <div className="w-1/2 relative">
            <SafetyImage
              clazz="rounded-lg w-full h-96 object-cover"
              src={product.images[currentImageIndex]}
              height={200}
              width={200}
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        'w-2 h-2 rounded-full',
                        currentImageIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="w-1/2">
            <div className="text-2xl font-bold text-orange-500 mb-2">
              {formatCurrency(product.unit_price - product.discount_price)}
            </div>
            <div className={cn('text-sm mb-2', product.stock > 0 ? 'text-green-500' : 'text-red-600 line-through')}>
              {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
            </div>

            <p className="text-gray-600 text-sm mb-2">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-4">
              {quantityDisplay}
              <button
                onClick={handleAddToCartClick}
                className={`min-w-[140px] text-white p-3 rounded-lg gap-2 flex items-center justify-center hover:shadow-xl transition-all 
                ${quantity == cartQuantity || quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient'}`}
                disabled={quantity == cartQuantity || quantity === 0}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className='text-sm whitespace-nowrap'>Thêm vào giỏ</span>
              </button>
              <button
                onClick={handleBuyNowClick}
                className="min-w-[120px] text-primary border border-primary p-3 rounded-lg gap-2 flex items-center justify-center hover:shadow-xl"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className='text-sm whitespace-nowrap'>Mua ngay</span>
              </button>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>Miễn phí giao hàng cho đơn trên 2,000,000 đ</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Bảo hành 1 năm</span>
              </div>
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-orange-500" />
                <span>Đổi trả trong vòng 1 tuần</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('features')}
              className={cn(
                'pb-2 transition-colors',
                activeTab === 'features'
                  ? 'text-blue-900 font-semibold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Mô tả sản phẩm
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={cn(
                'pb-2 transition-colors',
                activeTab === 'specs'
                  ? 'text-blue-900 font-semibold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Thông số kĩ thuật
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={cn(
                'pb-2 transition-colors',
                activeTab === 'reviews'
                  ? 'text-blue-900 font-semibold border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              Đánh giá
            </button>
          </div>

          <div className="mt-4">
            {activeTab === 'features' && (
              <VideoSection videoSrc={videoSrc} productDescription={product.description || ''} />
            )}
            {activeTab === 'specs' && (
              <p className="text-gray-700 text-sm">Chưa có thông số kĩ thuật</p>
            )}
            {activeTab === 'reviews' && (
              <p className="text-gray-700 text-sm">Chưa có đánh giá</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}