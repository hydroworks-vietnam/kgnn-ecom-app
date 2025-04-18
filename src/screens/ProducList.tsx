import { useCallback, useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import useCartStore, { isAddCartAnimationFinished, isCartOpen } from "@/store/cart";
import FloatingCart from "@/components/Button/FloatingCart";
import type { IProduct } from "@/types/product";
import { useIsMobile } from "@/hooks/useViewportDetector";
import DesktopProductList from "@/components/ui/DesktopProductList";
import MobileProductList from "@/components/ui/MobileProductList";
import { debounce } from "lodash";
import { getProductById } from "@/services/productService";
import ProductDetailCard from "@/components/Card/ProductDetailCard";
import MobileProductDetailCard from "@/components/Card/MobileProductDetailCard";

const ProductList = () => {
  const isMobile = useIsMobile();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartTrigger, setCartTrigger] = useState(0);
  const $isCartOpen = useStore(isCartOpen);
  const { addCartItem } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ catId: string; subCatId: string } | null>(null);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    if (productId) {
      // Fetch product details
      getProductById(productId)
        .then((product) => {
          setSelectedProduct(product);
          setIsPopupOpen(true);
          // Set the selected category and subcategory based on the product
          setSelectedCategory({ 
            catId: product.category_id, 
            subCatId: product.sub_category_id || 'all' 
          });
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
        });
    }
  }, []);

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
    setIsAddedToCart(false);
  };

  const handleBuyItNow = (product: IProduct, quantity: number) => {
    addCartItem({
      product,
      quantity,
      options: {},
    });
    setIsPopupOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <MobileProductList 
          handleAddToCart={handleAddToCart} 
          initialCategory={selectedCategory}
        />
      ) : (
        <DesktopProductList 
          handleAddToCart={handleAddToCart} 
          initialCategory={selectedCategory}
        />
      )}

      {isPopupOpen && selectedProduct && (
        isMobile ? (
          <MobileProductDetailCard
            product={selectedProduct}
            onClose={() => setIsPopupOpen(false)}
            handleAddToCart={handleAddToCart}
            handleBuyItNow={handleBuyItNow}
          />
        ) : (
          <ProductDetailCard
            product={selectedProduct}
            onClose={() => setIsPopupOpen(false)}
            handleAddToCart={handleAddToCart}
            handleBuyItNow={handleBuyItNow}
          />
        )
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