import { useCallback, useState } from "react";
import { useStore } from "@nanostores/react";
import useCartStore, { isAddCartAnimationFinished, isCartOpen } from "@/store/cart";
import FloatingCart from "@/components/Button/FloatingCart";
import type { IProduct } from "@/types/product";
import { useIsMobile } from "@/hooks/useViewportDetector";
import DesktopProductList from "@/components/ui/DesktopProductList";
import MobileProductList from "@/components/ui/MobileProductList";
import { debounce } from "lodash";

const ProductList = () => {
  const isMobile = useIsMobile();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartTrigger, setCartTrigger] = useState(0);
  const $isCartOpen = useStore(isCartOpen);
  const { addCartItem } = useCartStore();

  const handleAddToCart = useCallback(
    debounce((product: IProduct, quantity: number) => {
      setCartTrigger((prev) => {
        const newTrigger = prev + 1;
        setIsAddedToCart(true);
        addCartItem({
          product,
          options: {},
          quantity,
        });
        return newTrigger;
      });
    }, 200),
    []
  );

  const handleCartClick = () => {
    console.log("Toggling cart, current state:", $isCartOpen);
    isCartOpen.set(!$isCartOpen);
  };

  const handleFinishAnimation = () => {
    isAddCartAnimationFinished.set(true);
    setIsAddedToCart(false); // Reset immediately, no extra timeout
  };

  return (
    <>
      {isMobile ? (
        <MobileProductList handleAddToCart={handleAddToCart} />
      ) : (
        <DesktopProductList handleAddToCart={handleAddToCart} />
      )}

      <FloatingCart
        isAddedToCart={isAddedToCart}
        onCartClick={handleCartClick}
        isFinishAnimation={handleFinishAnimation}
      />
    </>
  );
};

export default ProductList;