import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { isCartOpen } from "@/store/cart";
import type { IProduct } from "@/types/product";
import { useIsMobile } from "@/hooks/useViewportDetector";
import DesktopProductList from "@/components/ui/DesktopProductList";
import MobileProductList from "@/components/ui/MobileProductList";
import ProductDetailCard from "@/components/Card/ProductDetailCard";
import MobileProductDetailCard from "@/components/Card/MobileProductDetailCard";
import Layout from "~/components/Layout";

export function meta() {
  return [
    { title: "Danh sách sản phẩm - Không gian nhà nông" },
    { name: "description", content: "Khám phá các sản phẩm nông nghiệp hữu cơ chất lượng cao từ Không gian nhà nông" },
  ];
}

export default function Products() {
  const isMobile = useIsMobile();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const $isCartOpen = useStore(isCartOpen);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProductClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleAddToCart = (product: IProduct, quantity: number) => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleCartClick = () => {
    isCartOpen.set(!$isCartOpen);
  };

  const handleBuyItNow = (product: IProduct, quantity: number) => {
    setIsPopupOpen(false);
  };

  return (
    <Layout>
      {isMobile ? (
        <MobileProductList
          handleAddToCart={handleAddToCart} 
          onProductClick={handleProductClick}
        />
      ) : (
        <DesktopProductList 
          handleAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
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

    </Layout>
  );
}
