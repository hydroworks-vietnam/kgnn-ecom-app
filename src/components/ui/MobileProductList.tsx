import React, { useEffect, useState } from 'react';
import ProductCardFull from '@/components/Card/ProductCardFull';
import type { ICategory, IProduct, ISubcategory } from '@/types/product';
import CategoryHorizontalBar from '@/components/ui/CategoryHorizontalBar';
import productService from '@/services/productService';

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

  const fetchProductList = async (category?: { catId: string; subCatId: string } | null) => {
    try {
      setProductsLoading(true);
      setProductsError(null);

      let fetchedProducts: IProduct[] = [];
      if (!category || category.catId === 'all') {
        // Fetch latest products
        fetchedProducts = await productService.getLatestProducts(10);
      } else {
        const query =
          category.subCatId === 'all'
            ? `category_id=${category.catId}`
            : `category_id=${category.catId}&sub_category_id=${category.subCatId}`;
        fetchedProducts = await productService.getProducts(query);
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

  // On mount: sync selectedCategory with initialCategory
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Whenever selectedCategory changes, fetch products
  useEffect(() => {
    fetchProductList(selectedCategory);
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

      <div className='mb-10'>
      <CategoryHorizontalBar
        onCategorySelect={handleCategorySelect}
        onLatestProductsSelect={handleLatestProductsSelect}
      />
      </div>

      {/* <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm</h1> */}
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