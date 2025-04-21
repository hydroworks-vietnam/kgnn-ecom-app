import useCartStore, { totalCartQuantity, isAddCartAnimationFinished, isCartOpen, isFloatingCartVisible } from "@/store/cart";
import { formatCurrency } from "@/utils/helpers";
import { useStore } from "@nanostores/react";
import { Package, ReceiptText } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const FloatingCart = ({
  isAddedToCart,
  onCartClick,
  isFinishAnimation,
}: {
  isAddedToCart: boolean;
  onCartClick?: () => void;
  isFinishAnimation: () => void;
}) => {
  const { calculateSubtotal } = useCartStore();
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [flyStartX, setFlyStartX] = useState(0);
  const [flyStartY, setFlyStartY] = useState(0);
  const cartRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const $totalQuantity = useStore(totalCartQuantity);
  const $isCartOpen = useStore(isCartOpen);
  const $isFloatingCartVisible = useStore(isFloatingCartVisible);
  const total = calculateSubtotal();
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAddedToCart) {
      triggerAnimation();
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isAddedToCart]);

  const triggerAnimation = () => {
    if (cartRef.current) {
      const cart = cartRef.current.getBoundingClientRect();
      const startX = window.innerWidth / 2 - 24;
      const startY = window.innerHeight / 2 - 24;

      setFlyStartX(startX);
      setFlyStartY(startY);

      const cartX = cart.left + cart.width / 2 - startX;
      const cartY = cart.top + cart.height / 2 - startY;

      document.documentElement.style.setProperty("--cart-x", `${cartX}px`);
      document.documentElement.style.setProperty("--cart-y", `${cartY}px`);
    }
    setAnimationTrigger((prev) => prev + 1);
    setShowAnimation(true);

    animationTimeoutRef.current = setTimeout(() => {
      setShowAnimation(false);
      isAddCartAnimationFinished.set(true);
      isFinishAnimation();
    }, 1000);
  };

  return (
    <>
      {showAnimation && (
        <div
          ref={animationRef}
          key={animationTrigger}
          className="fixed w-12 h-12 bg-primary rounded-full shadow-xl z-[10000] animate-fly-to-cart pointer-events-none"
          style={{
            top: flyStartY,
            left: flyStartX,
          }}
          onAnimationEnd={() => {
            console.log("[FloatingCart] Animation CSS ended");
          }}
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
        </div>
      )}

      {$totalQuantity > 0 && !$isCartOpen && $isFloatingCartVisible && (
        <div className="fixed bottom-20 right-0 z-[10000]">
          <button
            ref={cartRef}
            onClick={onCartClick}
            className="flex items-center gap-3 px-4 py-2 bg-primary text-white rounded-l-lg shadow-lg hover:opacity-90 transition-all duration-200"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold">
                {$totalQuantity > 99 ? '99+' : $totalQuantity} sản phẩm
              </span>
              <div className="flex items-center gap-2">
                <ReceiptText className="w-5 h-5 bg-[#CBDB47] text-primary" />
                <span className="text-[16px] font-semibold text-[#CBDB47]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingCart;