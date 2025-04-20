import { totalCartQuantity, isAddCartAnimationFinished, isFloatingCartVisible } from "@/store/cart";
import { useStore } from "@nanostores/react";
import { Package, ShoppingCartIcon } from "lucide-react";
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
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [flyStartX, setFlyStartX] = useState(0);
  const [flyStartY, setFlyStartY] = useState(0);
  const cartRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const $totalQuantity = useStore(totalCartQuantity);
  const isVisible = useStore(isFloatingCartVisible);
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

      {isVisible && (
        <button
          ref={cartRef}
          onClick={onCartClick}
          className={`fixed bottom-6 right-6 p-3 bg-gradient text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-[10000] ${
            showAnimation ? "animate-cart-bounce" : ""
          }`}
        >
          <ShoppingCartIcon className="w-5 h-5" />
          {$totalQuantity > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {$totalQuantity > 99 ? '99+' : $totalQuantity}
            </span>
          )}
        </button>
      )}
    </>
  );
};

export default FloatingCart;