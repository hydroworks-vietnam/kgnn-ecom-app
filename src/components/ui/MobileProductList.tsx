import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import ProductCardFull from '@/components/Card/ProductCardFull';
import type { IProduct } from '@/types/product';
import productService from '@/services/productService';
import {
  $latestProducts,
  $selectedCategory,
  $selectedSubcategory,
} from '@/store/category';

const ProductCardSkeleton = () => (
  <div className="w-full h-full rounded-lg shadow-md animate-pulse">
    <div className="bg-gray-200 rounded-t-lg h-48 sm:h-40" />
    <div className="p-3 flex flex-col">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-2" />
      <div className="flex items-center justify-between mt-2">
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const skeletonArray = Array(6).fill(0);

interface MobileProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
  initialCategory?: { catId: string; subCatId: string } | null;
}

const MobileProductList: React.FC<MobileProductListProps> = ({
  handleAddToCart,
  initialCategory,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const selectedCategory = useStore($selectedCategory);
  const selectedSubcategory = useStore($selectedSubcategory);
  const latestProducts = useStore($latestProducts);

  const fetchProductList = async (category: { catId: string; subCatId?: string }) => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      let query = `category_id=${category.catId}`;

      if (category.subCatId && category.subCatId !== 'all') {
        query += `&sub_category_id=${category.subCatId}`;
      }

      const fetchedProducts = await productService.getProducts(query);
      setProducts(fetchedProducts);
    } catch (error: any) {
      const errorMessage =
        typeof error.error === 'object' && error.error?.message
          ? error.error.message
          : 'Failed to fetch products';
      setProductsError(errorMessage);
    } finally {
      setProductsLoading(false);
    }
  };

  // Initial load from props
  useEffect(() => {
    if (initialCategory?.catId && initialCategory.catId !== 'all') {
      const query: { catId: string; subCatId?: string } = {
        catId: initialCategory.catId,
      };

      if (
        initialCategory.subCatId &&
        initialCategory.subCatId !== 'all' &&
        initialCategory.subCatId.trim() !== ''
      ) {
        query.subCatId = initialCategory.subCatId;
      }

      fetchProductList(query);
    } else {
      setProducts([]);
      setProductsLoading(false);
    }
  }, [initialCategory]);

  // React to selected category change (fallback to first subcat)
  useEffect(() => {
    if (!selectedCategory || !selectedSubcategory) return;

    fetchProductList({
      catId: selectedCategory.id,
      subCatId: selectedSubcategory.id,
    });
  }, [selectedCategory?.id, selectedSubcategory?.id]);

  // React to latest product changes
  useEffect(() => {
    if (latestProducts.length > 0) {
      setProducts(latestProducts);
      setProductsLoading(false);
    }
  }, [latestProducts]);

  return (
    <div className="max-w-lg w-full overflow-x-hidden min-h-screen">
      <nav className="text-sm text-gray-500 mb-3 overflow-x-hidden">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span> / </span>
        <span className="text-purple-600">Danh sách sản phẩm</span>
      </nav>

      <div className="w-full overflow-x-hidden">
        {productsLoading ? (
          <div className="grid grid-cols-2 space-x-1">
            {skeletonArray.map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : productsError ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
            {productsError}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p>Không có sản phẩm nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">            
            {products.map((product) => (
              <ProductCardFull
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileProductList;