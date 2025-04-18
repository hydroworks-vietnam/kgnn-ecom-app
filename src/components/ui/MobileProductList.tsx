import React, { useEffect, useState } from 'react';
import ProductCardFull from '@/components/Card/ProductCardFull';
import { getProducts } from '@/services/productService';
import type { ICategory, IProduct, ISubcategory } from '@/types/product';
import CategorySidebar from '@/components/ui/CategorySidebar';

const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-full rounded-lg shadow-md animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-200 rounded-t-lg h-48 sm:h-40"></div>

      {/* Content skeleton */}
      <div className="p-3 flex flex-col">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

        {/* Description skeleton */}
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>

        {/* Ratings skeleton */}
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="w-8 h-3 bg-gray-200 rounded ml-2"></div>
        </div>

        {/* Price and button skeleton */}
        <div className="flex items-center justify-between mt-2">
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const skeletonArray = Array(6).fill(0);

interface MobileProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
  initialCategory?: { catId: string; subCatId: string } | null;
}

const MobileProductList: React.FC<MobileProductListProps> = ({ handleAddToCart, initialCategory }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('best-match');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<{ catId: string; subCatId: string } | null>(initialCategory || null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const fetchProductList = async ({ catId, subCatId }: { catId: string; subCatId: string }) => {
    if (!catId || catId === 'all') return;
    try {
      setProductsLoading(true);
      setProductsError(null);
      const query = subCatId === 'all' ? `category_id=${catId}` : `category_id=${catId}&sub_category_id=${subCatId}`;
      const fetchedProducts = await getProducts(query);
      setProducts(fetchedProducts);
      setFilterOpen(false);
    } catch (error: any) {
      const errorMessage = typeof error.error === 'object' && error.error?.message ? error.error.message : 'Failed to fetch products';
      setProductsError(errorMessage);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchProductList(selectedCategory);
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category: ICategory, subcategory?: ISubcategory) => {
    setSelectedCategory({ catId: category.id, subCatId: subcategory?.id || 'all' });
  };

  const handleLatestProductsSelect = (latestProducts: IProduct[]) => {
    setProducts(latestProducts);
    setSelectedCategory(null);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value);
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => setItemsPerPage(Number(e.target.value));
  const toggleFilter = () => setFilterOpen(!filterOpen);

  return (
    <div className="max-w-lg w-full overflow-x-hidden">
      <nav className="text-sm text-gray-500 mb-3 overflow-x-hidden">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span> / </span>
        <span className="text-purple-600">Danh sách sản phẩm</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm</h1>

      <div className="bg-white shadow rounded-lg p-3 mb-4 flex justify-between items-center sticky top-0 z-10 w-full">
        <button onClick={toggleFilter} className="flex items-center text-gray-700 font-medium">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Bộ lọc
        </button>
        <div>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
          >
            <option value="best-match">Phù hợp nhất</option>
            <option value="price-low-to-high">Giá: Thấp đến Cao</option>
            <option value="price-high-to-low">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${filterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl transform transition-transform ${filterOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Bộ lọc</h2>
              <button onClick={toggleFilter} className="p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng mỗi trang:</label>
              <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <CategorySidebar 
              onCategorySelect={handleCategorySelect} 
              onLatestProductsSelect={handleLatestProductsSelect}
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4" onClick={toggleFilter}>Áp dụng</button>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-hidden">
        {productsLoading ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skeletonArray.map((_, index) => (
              <div key={`skeleton-${index}`} className="w-full">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        ) : productsError ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">{productsError}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p>Không có sản phẩm nào</p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCardFull product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileProductList;