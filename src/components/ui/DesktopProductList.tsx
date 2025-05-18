import React, { useEffect, useState } from 'react';
import ProductCardFull from '@/components/Card/ProductCardFull';
import { getLatestProducts, getProducts } from '@/services/productService';
import type { ICategory, IProduct, ISubcategory } from '@/types/product';
import CategoryHorizontalBar from '@/components/ui/CategoryHorizontalBar';

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

interface DesktopProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
  initialCategory?: { catId: string; subCatId: string } | null;
}

const DesktopProductList: React.FC<DesktopProductListProps> = ({ handleAddToCart, initialCategory }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('best-match');
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<{ catId: string; subCatId: string } | null>(initialCategory || null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const fetchProductList = async (category?: { catId: string; subCatId: string } | null) => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      let fetchedProducts: IProduct[] = [];
      if (!category || category.catId === 'all') {
        // Fetch latest products
        fetchedProducts = await getLatestProducts(10);
      } else {
        const query =
          category.subCatId === 'all'
            ? `category_id=${category.catId}`
            : `category_id=${category.catId}&sub_category_id=${category.subCatId}`;
        fetchedProducts = await getProducts(query);
      }

      setProducts(fetchedProducts);
      setFilterOpen(false);
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

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      fetchProductList(initialCategory); // Fetch using initial category
    } else {
      fetchProductList(null); // Fetch latest products
    }
  }, []);

  const handleCategorySelect = (category: ICategory, subcategory?: ISubcategory) => {
    setSelectedCategory({ catId: category.id, subCatId: subcategory?.id || 'all' });
  };

  const handleLatestProductsSelect = (latestProducts: IProduct[]) => {
    setProducts(latestProducts);
    setSelectedCategory(null);
  };

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <div className="pt-4 pb-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/" className="hover:underline">Trang chủ</a>
        <span> / </span>
        <span className="text-purple-600">Danh sách sản phẩm</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sản phẩm</h1>

      <div className='mb-6'>
      <CategoryHorizontalBar
        onCategorySelect={handleCategorySelect}
        onLatestProductsSelect={handleLatestProductsSelect}
      />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
          {/* Price Filter */}
          {/* <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Price Filter</h3>
            <ul className="space-y-2">
              {['$0.00 - $150.00', '$150.00 - $350.00', '$350.00 - $550.00', '$550.00+'].map(
                (range) => (
                  <li key={range}>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-600">{range}</span>
                    </label>
                  </li>
                )
              )}
            </ul>
          </div> */}

          {/* Filter by Color */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Filter by Color</h3>
            <div className="flex space-x-2">
              {['blue', 'green', 'orange', 'purple', 'sky'].map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300 cursor-pointer"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div> */}

        {/* Product Grid */}
        <div className="w-full">
          <div className="flex justify-end items-center mb-6">
            <div className="flex justify-end items-center space-x-4">
              {/* Per Page */}
              <div className="flex items-center">
                <label className="text-blue-900 font-bold text-xs mr-2">Số lượng mỗi trang:</label>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Sort By */}
              {/* <div className="flex items-center">
                <label className="text-blue-900 font-bold text-xs mr-2">Sort By:</label>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="border border-gray-200 rounded px-2 py-1 text-xs text-gray-600"
                >
                  <option value="best-match">Best Match</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                </select>
              </div> */}

              {/* View Toggle */}
              <div className="flex items-center">
                <label className="text-blue-900 font-bold text-xs mr-2">Dạng hiên thị:</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewModeChange('grid')}
                    className={viewMode === 'grid' ? 'text-blue-900' : 'text-gray-400'}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleViewModeChange('list')}
                    className={viewMode === 'list' ? 'text-blue-900' : 'text-gray-400'}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm4-11h12v2H8zm0 5h12v2H8zm0 5h12v2H8z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-hidden">
            {productsLoading ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-3 gap-6'
                    : 'flex flex-col gap-6'
                }
              >
                {products.map((product) => (
                  <ProductCardFull key={product.id} product={product} viewMode={viewMode} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProductList;