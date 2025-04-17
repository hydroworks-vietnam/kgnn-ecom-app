import { useEffect, useState } from 'react';
import ProductSlider from '@/components/Slider/ProductSlider';
import { ChevronRight } from 'lucide-react';
import FloatingCart from '../Button/FloatingCart';
import { useStore } from '@nanostores/react';
import { isAddCartAnimationFinished, isCartOpen } from '@/store/cart';

export default function HomePage() {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const $isCartOpen = useStore(isCartOpen);

  const handleCartClick = () => {
    isCartOpen.set(!$isCartOpen);
  };

  useEffect(() => {
    function updateSlidesPerView() {
      const isMobile = window.innerWidth < 768;
      const slidesPerView = isMobile ? 2 : 4;

      document
        .querySelectorAll('[data-component="product-card-slider"]')
        .forEach((card: any) => {
          if (card.__svelte && card.__svelte.slidesPerView) {
            card.__svelte.slidesPerView = slidesPerView;
          }
        });
    }

    // Run on load and window resize
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  return (
    <>
      <div className="my-8 md:my-16">
        <div className="mx-auto">
          <div className="px-4 md:px-0 mb-8">
            <div className="flex items-center justify-center gap-4 relative">
              <h3 className="text-2xl md:text-4xl font-bold text-[#151875]">
                Sản phẩm mới nhất
              </h3>
              <button
                className="bg-black text-white px-4 md:px-6 py-2 rounded-full transition-colors flex items-center gap-2 group hover:shadow-xl hover:bg-black/80 whitespace-nowrap text-sm md:text-base"
                onClick={() => window.location.href = '/products'}
              >
                <span>Xem tất cả</span>
                <ChevronRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
          <ProductSlider/>
        </div>
      </div>

      <FloatingCart
        isAddedToCart={isAddedToCart}
        onCartClick={handleCartClick}
        isFinishAnimation={() => {
          setIsAddedToCart(false);
        }}
      />
    </>
  );
}