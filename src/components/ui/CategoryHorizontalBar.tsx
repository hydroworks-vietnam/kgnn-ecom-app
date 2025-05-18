import React, { useState, useEffect } from 'react';
import { getCategories } from '@/services/categoryService'; // Adjust import path
import { getLatestProducts } from '@/services/productService';
import type { ICategory, ISubcategory } from '@/types/product';

interface CategoryHorizontalBarProps {
  onCategorySelect: (category: ICategory, subcategory?: ISubcategory) => void;
  onLatestProductsSelect?: (products: any[]) => void;
}

const CategorySidebarSkeleton: React.FC = () => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {Array(5).fill(0).map((_, index) => (
        <div
          key={`cat-skeleton-${index}`}
          className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
        ></div>
      ))}
    </div>
  );
};

const SubcategoryBar: React.FC<{
  subcategories: ISubcategory[];
  selectedSubcategory: ISubcategory | null;
  onSubcategorySelect: (subcategory: ISubcategory) => void;
}> = ({ subcategories, selectedSubcategory, onSubcategorySelect }) => {
  return (
    <div className="w-full mt-2 py-1">
      <div className="flex items-center space-x-2 overflow-x-auto px-4">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory.id}
            onClick={() => onSubcategorySelect(subcategory)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 relative ${selectedSubcategory?.id === subcategory.id
                ? 'bg-white text-primary'
                : 'text-white hover:text-primary hover:bg-white'
              }`}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const CategoryHorizontalBar: React.FC<CategoryHorizontalBarProps> = ({ onCategorySelect, onLatestProductsSelect }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);
  const [showNewArrivals, setShowNewArrivals] = useState<boolean>(false);

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
          // Add the "all" category to the beginning of the array
          const finalCategories = [
            {
              id: 'all',
              name: 'Tất cả',
              sub_categories: [],
            },
            ...processedCategories,
          ];

          setCategories(finalCategories);
          setSelectedCategory(finalCategories[0]);
          setSelectedSubcategory(finalCategories[0].sub_categories[0] || null);
          onCategorySelect(finalCategories[0], finalCategories[0].sub_categories[0]);
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

  const handleCategorySelect = (category: ICategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(category.sub_categories[0] || null);
    setShowNewArrivals(false);
    onCategorySelect(category, category.sub_categories[0]);
  };

  const handleSubcategorySelect = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    setShowNewArrivals(false);
    if (selectedCategory) {
      onCategorySelect(selectedCategory, subcategory);
    }
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
    <div className="w-full bg-gradient">
      {/* Parent Category Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2">
        {isLoading ? (
          <CategorySidebarSkeleton />
        ) : (
          <>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 relative ${selectedCategory?.id === category.id
                    ? 'bg-white text-primary'
                    : 'text-white hover:text-primary hover:bg-white'
                  }`}
              >
                {category.name}
              </button>
            ))}

            {/* New Arrivals button */}
            <button
              onClick={handleNewArrivalsClick}
              className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 relative ${showNewArrivals
                  ? 'bg-white text-primary'
                  : 'text-white hover:shadow-xl hover:bg-white hover:text-primary'
                }`}
            >
              Sản phẩm mới
            </button>
          </>
        )}
      </div>

      <hr className='bg-white h-1' />

      {/* Subcategory Bar */}
      {selectedCategory && selectedCategory.sub_categories.length > 0 && !showNewArrivals && (
        <SubcategoryBar
          subcategories={selectedCategory.sub_categories}
          selectedSubcategory={selectedSubcategory}
          onSubcategorySelect={handleSubcategorySelect}
        />
      )}
    </div>
  );
};

export default CategoryHorizontalBar;