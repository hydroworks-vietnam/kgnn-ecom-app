import React, { useState, useEffect } from 'react';
import { getCategories } from '@/services/categoryService'; // Adjust import path
import type { ICategory, ISubcategory } from '@/types/product';

interface CategorySidebarProps {
  onCategorySelect: (category: ICategory, subcategory?: ISubcategory) => void;
}

const CategorySidebarSkeleton: React.FC = () => {
  // Generate dummy arrays for skeleton UI
  const categoryCount = 5;
  const subcategoryCount = 4;

  return (
    <div className="mb-6">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>

      {/* Categories skeleton */}
      <div className="space-y-4">
        {Array(categoryCount).fill(0).map((_, index) => (
          <div key={`cat-skeleton-${index}`}>
            {/* Category button skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded animate-pulse mb-2"></div>

            {/* Show subcategories for the first category to mimic expanded state */}
            {index === 0 && (
              <div className="pl-4 mt-2 space-y-2">
                {Array(subcategoryCount).fill(0).map((_, subIndex) => (
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

const CategorySidebar: React.FC<CategorySidebarProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories();

        if (response && Array.isArray(response)) {
          // Add 'All' subcategory to each category
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

          // Set initial selection
          if (processedCategories.length > 0) {
            const firstCategory = processedCategories[0];
            setSelectedCategory(firstCategory);
            setSelectedSubcategory(firstCategory.sub_categories[0]);

            // Trigger initial category selection
            onCategorySelect(firstCategory, firstCategory.sub_categories[0]);
          }

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

  // Handle category selection
  const handleCategorySelect = (category: ICategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(category.sub_categories[0]);
    onCategorySelect(category, category.sub_categories[0]);
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory: ISubcategory) => {
    setSelectedSubcategory(subcategory);
    onCategorySelect(selectedCategory!, subcategory);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h3>
      {categories.length < 1 ? <CategorySidebarSkeleton /> :
        (<div className="space-y-2">
          {categories.map(category => (
            <div key={category.id}>
              <button
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-2 rounded text-gray-800 font-medium ${selectedCategory?.id === category.id && selectedSubcategory?.id === 'all'
                  ? 'bg-purple-100 text-purple-700'
                  : 'hover:bg-gray-100'
                  }`}
              >
                {category.name}
              </button>

              {selectedCategory?.id === category.id && (
                <div className="pl-4 mt-2 space-y-1">
                  {category.sub_categories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategorySelect(subcategory)}
                      className={`w-full text-left px-3 py-1 text-sm rounded transition-colors duration-200 ${selectedSubcategory?.id === subcategory.id
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
        </div>)
      }
    </div>
  );
};

export default CategorySidebar;