import { useState, useEffect, useRef, type JSX } from 'react';
import {
  ShoppingCartIcon,
  X,
  History,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn, formatCurrency } from '@/utils/helpers';
import SafetyImage from '../Image/SafetyImage';
import type { IProduct } from '@/types/product';
import ReviewStar from '../Review/Star';
import useCartStore, { isAddCartAnimationFinished, isCartOpen, isFloatingCartVisible } from '@/store/cart';
import QuantityControl from '@/components/ui/QuantityControl';
import { useStore } from '@nanostores/react';
import YoutubeVideo from '@/components/ui/YoutubeVideo';
import { useVideoSource } from '@/hooks/useVideoSource';

type ProductDetailCardProps = {
  product: IProduct,
  onClose: () => void;
  handleAddToCart: (product: IProduct, quantity: number) => void;
  handleBuyItNow: (product: IProduct, quantity: number) => void;
}

// Mobile bottom sheet product detail component
export default function MobileProductDetailCard({ product, onClose, handleAddToCart, handleBuyItNow }: ProductDetailCardProps) {
  const { getCartItemQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(getCartItemQuantity(product.id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [showVariantSelector, setShowVariantSelector] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('3 in One');
  const [sheetPosition, setSheetPosition] = useState('peek');
  const isAnimationFinished = useStore(isAddCartAnimationFinished);

  const sheetRef = useRef(null);
  const variantRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showVariantSelector]);

  // Hide floating cart when component mounts
  useEffect(() => {
    isFloatingCartVisible.set(false);
    return () => {
      // Show floating cart when component unmounts
      isFloatingCartVisible.set(true);
    };
  }, []);

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

  const videoSrc = useVideoSource(product.video_link);

  const toggleVariantSelector = () => {
    setShowVariantSelector(!showVariantSelector);
  };

  const handleClickOutside = (e) => {
    if (sheetRef.current && !sheetRef.current.contains(e.target)) {
      if (showVariantSelector && variantRef.current && !variantRef.current.contains(e.target)) {
        setShowVariantSelector(false);
      } else if (!showVariantSelector) {
        onClose();
      }
    }
  };

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    currentY.current = startY.current;

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 50) {
      if (sheetPosition === 'full') {
        setSheetPosition('half');
      } else if (sheetPosition === 'half') {
        setSheetPosition('peek');
      } else if (sheetPosition === 'peek' && deltaY > 100) {
        onClose();
      }
    } else if (deltaY < -50) {
      if (sheetPosition === 'peek') {
        setSheetPosition('half');
      } else if (sheetPosition === 'half') {
        setSheetPosition('full');
      }
    }
  };

  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSheetPosition('half');
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const toggleSheetHeight = () => {
    setSheetPosition(prev => prev === 'full' ? 'half' : 'full');
  };

  const getSheetStyle = () => {
    switch (sheetPosition) {
      case 'half':
        return 'h-2/3';
      case 'full':
        return 'h-full';
      default:
        return 'h-2/3';
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!isAnimationFinished) return;
    setQuantity(newQuantity);
  };

  const handleIncrease = () => {
    if (!isAnimationFinished) return;
    handleQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (!isAnimationFinished) return;
    handleQuantityChange(Math.max(0, quantity - 1));
  };

  const handleBuyNowClick = (product: IProduct, quantity: number) => {
    handleBuyItNow(product, quantity);
    isCartOpen.set(true);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-end"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 40
      }}
      onClick={onClose}
    >
      <div
        ref={sheetRef}
        className={cn(
          "relative bg-white rounded-t-xl w-full overflow-hidden transition-all duration-300",
          getSheetStyle()
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex justify-center py-2 cursor-grab"
          onTouchStart={handleTouchStart}
          onClick={(e) => {
            e.stopPropagation();
            toggleSheetHeight();
          }}
        >
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-500 z-100 rounded-2xl bg-primary"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4">
            <div className="relative w-full">
              <div className="relative overflow-hidden">
                <div className="relative w-full h-64 overflow-hidden rounded-md">
                  <SafetyImage
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    clazz="w-full h-full object-cover rounded-md"
                  />
                </div>

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        currentImageIndex === index
                          ? "bg-blue-600 w-4"
                          : "bg-gray-300 hover:bg-gray-400"
                      )}
                    />
                  ))}
                </div>
              )}

              {product.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white text-xs px-2 py-1 rounded-sm">
                  {currentImageIndex + 1}/{product.images.length}
                </div>
              )}
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-lg text-primary font-bold truncate flex-1">{product.name}</h1>
                <div className="text-slate-400 font-bold ml-4">
                  {formatCurrency(product.unit_price - product.discount_price)}
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-2 my-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Miễn phí giao hàng cho đơn trên 2,000,000 đ</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Bảo hành 1 năm</span>
                </div>
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  <span>Trả hàng trong 7 ngày</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-b flex-shrink-0">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={cn(
                  "flex-1 py-3 text-sm font-medium",
                  activeTab === 'description'
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                )}
              >
                Mô tả
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={cn(
                  "flex-1 py-3 text-sm font-medium",
                  activeTab === 'details'
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                )}
              >
                Thông số kĩ thuật
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={cn(
                  "flex-1 py-3 text-sm font-medium",
                  activeTab === 'reviews'
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                )}
              >
                Đánh giá
              </button>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto py-4">
            {activeTab === 'description' && (
              <div className="p-4">
                <p className="text-gray-700 text-sm">{product.description}</p>
                {videoSrc && (
                  <div className="mt-4">
                    <YoutubeVideo src={videoSrc} />
                  </div>
                )}
              </div>
            )}
            {activeTab === 'details' && (
              <div className="p-4">
                <p className="text-gray-700 text-sm">Chưa có thông số kĩ thuật</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="p-4">
                <p className="text-gray-700 text-sm">Chưa có đánh giá</p>
              </div>
            )}
          </div>

          {/* Fixed bottom section for quantity control and buttons */}
          <div className="flex-shrink-0 border-t bg-white sticky bottom-0">
            <div className="px-4 py-3 flex justify-between items-center border-b">
              <span className="text-sm font-medium">Số lượng</span>
              <QuantityControl
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                size="md"
              />
            </div>
            <div className="p-4 flex gap-3 bg-white border-t">
              <button
                onClick={() => {
                  if (!isAnimationFinished) return;
                  handleAddToCart(product, quantity);
                  onClose();
                }}
                className={cn(
                  "flex-1 py-3 bg-gradient text-white rounded-lg flex items-center justify-center gap-2",
                  !isAnimationFinished || quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Thêm vào giỏ hàng</span>
              </button>
              <button
                onClick={() => {
                  if (!isAnimationFinished) return;
                  handleBuyItNow(product, quantity);
                  onClose();
                }}
                className="flex-1 bg-white border border-primary text-primary py-3 text-sm rounded-lg flex items-center justify-center"
                disabled={!isAnimationFinished}
              >
                <span className="text-sm font-semibold">Mua ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}