import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { getLatestProducts } from '@/services/productService';
import ProductCardSlider from '@/components/Card/ProductCardSlider';

const Productslider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(6);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    fetchLatestlatestProducts();
  }, []);

  const fetchLatestlatestProducts = async () => {
    try {
      const res = await getLatestProducts(6);
      setLatestProducts(res);
    } catch (err) {
      console.log("🚀 ~ fetchLatestlatestProducts ~ err:", err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(3);
        setIsMobile(true);
      } else {
        setSlidesPerView(6);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!latestProducts || latestProducts.length === 0) {
    return <div className="w-full mx-auto">Tiếc quá, chưa có sản phẩm phù hợp</div>;
  }

  const maxIndex = Math.max(0, Math.ceil((latestProducts.length - slidesPerView) / slidesPerView));
  const shouldShowNavigation = latestProducts.length > slidesPerView;

  const nextSlide = () => {
    if (isTransitioning || currentIndex >= maxIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning || currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const canGoNext = currentIndex < maxIndex && shouldShowNavigation;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative w-full mx-auto">
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-300 ease-in-out",
            isTransitioning ? "opacity-90" : "opacity-100"
          )}
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {latestProducts.map((product) => (
            <ProductCardSlider
              key={product.id}
              {...product}
              slidesPerView={slidesPerView}
              client:load
            />
          ))}
        </div>
      </div>

      {shouldShowNavigation && (
        <>
          <div className="absolute inset-y-0 -left-2 md:-left-4 flex items-center">
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={cn(
                "h-8 w-8 rounded-full bg-white shadow-md text-gray-800 flex items-center justify-center z-10",
                !canGoPrev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute inset-y-0 -right-2 md:-right-4 flex items-center">
            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={cn(
                "h-8 w-8 rounded-full bg-white shadow-md text-gray-800 flex items-center justify-center z-10",
                !canGoNext ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Productslider;