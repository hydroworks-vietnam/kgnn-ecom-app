import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface ProductSliderProps {
  products: {
    id: number;
    name: string;
    code: string;
    price: string;
    image: string;
    isHighlighted?: boolean;
    colors: string[];
  }[];
  children: React.ReactNode;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update slidesPerView based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(2);
        setIsMobile(true);
      } else {
        setSlidesPerView(4);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Safety check for empty products array
  if (!products || products.length === 0) {
    return <div className="w-full mx-auto">No products available</div>;
  }

  // Calculate total slides based on actual product count
  const totalSlides = Math.ceil(products.length / slidesPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const nextSlide = () => {
    if (isTransitioning || currentIndex >= maxIndex || products.length <= slidesPerView) return;
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

  // Determine if navigation should be shown at all
  const shouldShowNavigation = products.length > slidesPerView;

  // Only show next button if there are more products to show
  const canGoNext = currentIndex <= maxIndex && shouldShowNavigation;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative w-full mx-auto">
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "flex transition-transform duration-300 ease-in-out mx-auto",
            isTransitioning ? "opacity-90" : "opacity-100"
          )}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${totalSlides * 100}%`
          }}
        >
          {children}
        </div>
      </div>

      {/* Navigation Buttons - Only show if needed */}
      {shouldShowNavigation && (
        <>
          <div className="absolute inset-y-0 -left-2 md:-left-6 flex items-center">
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

          <div className="absolute inset-y-0 -right-2 md:-right-6 flex items-center">
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

      {/* Dots Indicator - Only show if needed */}
      {totalSlides > 1 && shouldShowNavigation && (
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: totalSlides }, (_, index) => (
            <div
              key={index}
              className={cn(
                "w-6 h-2 rounded-sm transition-all",
                currentIndex === index
                  ? "bg-primary"
                  : "bg-orange-200"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSlider;