import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import ProductCardFull from '@/components/Card/ProductCardFull';
import type { IProduct } from '@/types/product';
import productService from '@/services/productService';
import {
  $selectedCategory,
  $selectedSubcategory,
  $latestProducts,
} from '@/store/category';

const ProductCardSkeleton = () => (
  <div className="w-72 h-auto rounded-lg shadow-md animate-pulse">
    <div className="bg-gray-200 rounded-t-lg aspect-square w-full" />
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

const skeletonArray = Array(8).fill(0);

interface DesktopProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
}

const DesktopProductList: React.FC<DesktopProductListProps> = ({ handleAddToCart }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const selectedCategory = useStore($selectedCategory);
  const selectedSubcategory = useStore($selectedSubcategory);
  const latestProducts = useStore($latestProducts);

  const fetchProductList = async (catId: string, subCatId?: string) => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      if (catId === 'all') {
        setProducts(latestProducts);
        return;
      }

      let query = `category_id=${catId}`;
      if (subCatId && subCatId !== 'all') {
        query += `&sub_category_id=${subCatId}`;
      }

      const fetched = await productService.getProducts(query);
      setProducts(fetched);
    } catch (error: any) {
      setProductsError(error?.error?.message || 'Failed to fetch products');
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory?.id) {
      fetchProductList(selectedCategory.id, selectedSubcategory?.id);
    } else {
      setTimeout(() => {
        setProductsLoading(false);
      }, 2000);
    }
  }, [selectedCategory?.id, selectedSubcategory?.id]);

  return (
    <div className="pt-4 pb-8 h-screen">
      {/* Title + Filters */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Sản phẩm</h1>
        <div className="flex gap-4">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-xs text-gray-600"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <button
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'text-blue-900' : 'text-gray-400'}
          >
            Lưới
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'text-blue-900' : 'text-gray-400'}
          >
            Danh sách
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 md:px-12">
        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skeletonArray.map((_, idx) => (
              <ProductCardSkeleton key={`skeleton-${idx}`} />
            ))}
          </div>
        ) : productsError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded">{productsError}</div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 text-center py-10"> Tiếc quá chưa có sản phẩm nào phù hợp</div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                : 'flex flex-col gap-6'
            }
          >
            {products.map((product) => (
              <ProductCardFull
                key={product.id}
                product={product}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopProductList;