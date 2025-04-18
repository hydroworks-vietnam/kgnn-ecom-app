import React, { useState, useEffect, useRef } from 'react';
import { getCategories } from '@/services/categoryService'; // Adjust import path
import { getLatestProducts } from '@/services/productService';
import type { ICategory, ISubcategory } from '@/types/product';

interface CategorySidebarProps {
  onCategorySelect: (category: ICategory, subcategory?: ISubcategory) => void;
  onLatestProductsSelect?: (products: any[]) => void;
}

const CategorySidebarSkeleton: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {Array(5).fill(0).map((_, index) => (
          <div key={`cat-skeleton-${index}`}>
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse mb-2"></div>
            {index === 0 && (
              <div className="pl-4 mt-2 space-y-2">
                {Array(4).fill(0).map((_, subIndex) => (
                  <div
                    key={`subcat-skeleton-${subIndex}`}
                    className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CategorySidebar: React.FC<CategorySidebarProps> = ({ onCategorySelect, onLatestProductsSelect }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);
  const [showNewArrivals, setShowNewArrivals] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories();

        if (response && Array.isArray(response)) {
          const processedCategories = response.map((category) => ({
            ...category,
            sub_categories: [
              {
                id: 'all',
                name: 'Tất cả',
                cat_id: category.id,
              },
              ...(category.sub_categories || []),
            ],
          }));

          setCategories(processedCategories);
          setSelectedCategory(processedCategories[0]);
          setSelectedSubcategory(processedCategories[0].sub_categories[0]);
          onCategorySelect(processedCategories[0], processedCategories[0].sub_categories[0]);

          setIsLoading(false);
        } else {
          throw new Error('Invalid response from getCategories');
        }
      } catch (error: any) {
        let errorMessage: string;

        if (error instanceof Error) {
          errorMessage = error.message || 'Đã có lỗi trong quá trình xử lí, vui lòng thử lại';
        } else if (typeof error === 'object' && error.error) {
          errorMessage =
            typeof error.error === 'object' && error.error.message
              ? error.error.message
              : 'Đã có lỗi trong quá trình xử lí, vui lòng thử lại';
        } else {
          errorMessage = 'Đã có lỗi trong quá trình xử lí, vui lòng thử lại';
        }

        console.error('Error fetching categories:', error);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        sidebarRef.current.style.top = `${window.scrollY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategorySelect = (category: ICategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(category.sub_categories[0]);
    setShowNewArrivals(false);
    onCategorySelect(category, category.sub_categories[0]);
  };

  const handleSubcategorySelect = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setShowNewArrivals(false);
    onCategorySelect(selectedCategory!, subcategory);
  };

  const handleNewArrivalsClick = async () => {
    try {
      setIsLoading(true);
      const latestProducts = await getLatestProducts(10); // Fetch 10 latest products
      setShowNewArrivals(true);
      setSelectedCategory(null); // Clear category selection
      setSelectedSubcategory(null); // Clear subcategory selection
      if (onLatestProductsSelect) {
        onLatestProductsSelect(latestProducts);
      }
    } catch (error) {
      console.error('Error fetching latest products:', error);
      setError('Failed to fetch latest products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="sticky z-10 transition-all duration-300 overflow-y-auto custom-scrollbar max-h-[calc(100vh-4rem)]"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#9CA3AF #F3F4F6',
      }}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h3>
        {categories.length < 1 ? (
          <CategorySidebarSkeleton />
        ) : (
          <div>
            {categories.map((category) => (
              <div key={category.id} className="mb-1">
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left px-3 py-2 rounded text-gray-800 text-lg ${
                    selectedCategory?.id === category.id && selectedSubcategory?.id === 'all'
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>

                {selectedCategory?.id === category.id && (
                  <div className="pl-4 mt-2 space-y-1 mb-2">
                    {category.sub_categories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubcategorySelect(subcategory)}
                        className={`w-full text-left px-3 py-1 text-md rounded transition-colors duration-200 ${
                          selectedSubcategory?.id === subcategory.id
                            ? subcategory.id === 'all'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-purple-500 text-white font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* New Arrivals Filter */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleNewArrivalsClick}
            className={`w-full text-left px-3 py-2 rounded text-gray-800 text-lg ${
              showNewArrivals ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
            }`}
          >
            Sản phẩm mới
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;