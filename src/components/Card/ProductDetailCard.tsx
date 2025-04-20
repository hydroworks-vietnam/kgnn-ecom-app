import { useEffect, useMemo, useState, useCallback, type JSX } from 'react';
import SafetyImage from '@/components/Image/SafetyImage';
import { ShoppingCartIcon, X, History, ShieldCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import type { IProduct } from '@/types/product';
import { cn, formatCurrency } from '@/utils/helpers';
import useCartStore from '@/store/cart';
import ReviewStar from '@/components/Review/Star';
import YoutubeVideo from '@/components/ui/YoutubeVideo';
import { useVideoSource } from '@/hooks/useVideoSource';
import QuantityControl from '@/components/ui/QuantityControl';

type ProductDetailCardProps = {
  product: IProduct,
  onClose: () => void;
  handleAddToCart: (product: IProduct, quantity: number) => void;
  handleBuyItNow: (product: IProduct, quantity: number) => void;
}

export default function ProductDetailCard(props: ProductDetailCardProps) {
  const { product, onClose, handleAddToCart, handleBuyItNow } = props;
  const { getCartItemQuantity } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'reviews'>('features');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const getTextSizeClass = (num: number): string => {
    const length = num.toString().length;
    if (length > 6) return 'text-xs';
    if (length > 4) return 'text-sm';
    return 'text-md';
  };

  const textSizeClass = useMemo(() => getTextSizeClass(quantity), [quantity]);
  const videoSrc = useVideoSource(product.video_link);

  // Functions to handle sliding
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

  const handleQuantityDecrease = useCallback(() => {
    setQuantity(prev => Math.max(1, prev - 1));
  }, []);

  const handleQuantityIncrease = useCallback(() => {
    setQuantity(prev => prev + 1);
  }, []);

  const handleAddToCartClick = useCallback(async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    await handleAddToCart(product, quantity);
    setTimeout(() => {
      setIsAddingToCart(false);
      setQuantity(1); // Reset quantity after adding to cart
    }, 1000);
  }, [isAddingToCart, product, quantity, handleAddToCart]);

  const handleBuyNowClick = useCallback(() => {
    handleBuyItNow(product, quantity);
    setQuantity(1); // Reset quantity after buying
  }, [product, quantity, handleBuyItNow]);

  // Memoize the quantity display
  const quantityDisplay = useMemo(() => (
    <div className="flex items-center">
      <QuantityControl
        quantity={quantity}
        onIncrease={handleQuantityIncrease}
        onDecrease={handleQuantityDecrease}
        size="md"
        className={isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}
      />
    </div>
  ), [quantity, handleQuantityDecrease, handleQuantityIncrease, isAddingToCart]);

  // Find this product in cart to get its initial quantity
  useEffect(() => {
    const cartItem = getCartItemQuantity(product.id);
    if (cartItem) {
      setQuantity(cartItem);
    } else {
      setQuantity(1);
    }
  }, [product.id, getCartItemQuantity]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 40,
        pointerEvents: 'auto'
      }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-[50%] h-[90%] relative shadow-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-1 right-0 border-2 border-red-500 hover:text-red-700  hover:border-red-700 rounded-full p-1"
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
            {/* Navigation Buttons */}
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
                {/* Image Indicators */}
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

          {/* Details Section */}
          <div className="w-1/2">
            <div className="text-2xl font-bold text-orange-500 mb-2">
              {formatCurrency(product.unit_price - product.discount_price)}
            </div>
            <div className={cn('text-sm mb-2', product.stock > 0 ? 'text-green-500' : 'text-red-600 line-through')}>
              {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-2">
              {product.description}
            </p>

            {/* Rating and Price */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                <ReviewStar rating={5} />
              </div>
              <span className="text-sm text-gray-500">
                ({124} đánh giá)
              </span>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="flex items-center gap-3 mb-4">
              {quantityDisplay}
              <button
                onClick={handleAddToCartClick}
                disabled={isAddingToCart}
                className={`min-w-[140px] text-white p-3 rounded-lg gap-2 flex items-center justify-center hover:shadow-xl transition-all ${
                  isAddingToCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient'
                }`}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className='text-sm whitespace-nowrap'>Thêm vào giỏ</span>
              </button>
              <button
                onClick={handleBuyNowClick}
                disabled={isAddingToCart}
                className="min-w-[120px] text-primary border border-primary p-3 rounded-lg gap-2 flex items-center justify-center hover:shadow-xl"
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span className='text-sm whitespace-nowrap'>Mua ngay</span>
              </button>
            </div>

            {/* Additional Info */}
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

        {/* Tabs for Features, Specifications, Reviews */}
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
              Công năng
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

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Đặc tính sản phẩm</h3>
                <p className="text-gray-600 mt-2">
                  {product.description}
                </p>
                {videoSrc && (
                  <div className="relative rounded-lg overflow-hidden mt-8">
                    <YoutubeVideo src={videoSrc} />
                  </div>
                )}
              </div>
            )}
            {activeTab === 'specs' && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Thông số kỹ thuật</h3>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Đánh giá sản phẩm</h3>
                <p className="text-gray-600 mt-2">Các bài đánh giá</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}