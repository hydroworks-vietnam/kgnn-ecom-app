import { useState, useCallback, memo } from 'react';
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
import DashDivider from '../Divider/DashDivider';
import ImageGalleryIndicator from '../Image/ImageGalleryIndicator';

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
  const cartQuantity = getCartItemQuantity(product.id);
  const [quantity, setQuantity] = useState(cartQuantity);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');

  const videoSrc = useVideoSource(product.video_link);

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
        className="bg-white rounded-lg w-full max-w-[30%] h-[85%] relative shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 isolate flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-2 bg-white text-red-600 border-2 border-red-600 hover:bg-red-500 hover:text-white 
          rounded-full w-8 h-8 flex items-center justify-center z-50"
        >
          <X />
        </button>

        <div className="w-full flex flex-col">
          <div className="w-full relative">
            <SafetyImage
              clazz="rounded-t-lg w-full h-60 object-cover"
              src={product.images[currentImageIndex]}
            />
            <ImageGalleryIndicator currentIndex={currentImageIndex} totalImages={product.images.length} position="bottom-left" />            

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

          <div className="flex items-center justify-between mt-5 px-5 py-1">
            <div>
              <h2 className="text-lg font-bold text-green-900 mb-1">
                {product.name}
              </h2>
              <div className="text-xl font-bold text-orange-500 mb-1">
                {formatCurrency(product.unit_price)}
              </div>
            </div>
            <QuantityControl quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
          </div>

          <div className="flex justify-end items-center px-5">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCartClick}
                className={`min-w-[100px] text-white p-2 rounded-lg gap-2 flex items-center justify-center bg-primary hover:bg-orange-500 transition-all 
                ${quantity === cartQuantity || quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                disabled={quantity === cartQuantity || quantity === 0}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">Thêm vào giỏ</span>
              </button>
              <button
                onClick={handleBuyNowClick}
                className="min-w-[80px] py-2 px-2 rounded-lg gap-2 flex items-center justify-center border border-primary text-primary"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">Mua ngay</span>
              </button>
            </div>
          </div>

          <div className='px-6 my-6'>
            <DashDivider className="px-2" thickness="3px" color="border-slate-300" />
          </div>

          <div className="text-sm text-gray-600 space-y-2 mb-4 px-5">
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

          <div className="w-full mt-auto px-5">
            <div className="flex gap-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('features')}
                className={cn(
                  'pb-2 transition-colors',
                  activeTab === 'features'
                    ? 'text-green-900 font-semibold border-b-2 border-orange-500'
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
                    ? 'text-green-900 font-semibold border-b-2 border-orange-500'
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
                    ? 'text-green-900 font-semibold border-b-2 border-orange-500'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                Đánh giá
              </button>
            </div>

            <div className="mt-2">
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
    </div>
  );
}