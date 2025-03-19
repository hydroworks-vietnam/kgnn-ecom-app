import React, { useEffect, useState } from 'react';
import type { ICategory, ISubcategory } from '@/types/product';
import { useCategories } from '@/hooks/useCategories';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface Props {
  onCategorySelect?: (category: ICategory, subcategories: ISubcategory[] | null) => void;
  onSubcategorySelect?: (subcategory: ISubcategory) => void;
}

const CategoryHorizontalBar: React.FC<Props> = ({
  onCategorySelect,
  onSubcategorySelect,
}) => {
  const {
    categories,
    selectedCategory,
    setCategorySelection,
    setSubcategorySelection,
  } = useCategories();

  const [activeSubcategories, setActiveSubcategories] = useState<ISubcategory[] | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);

  useEffect(() => {
    if (selectedCategory?.sub_categories?.length) {
      setActiveSubcategories(selectedCategory.sub_categories);

      // Prevent resetting if subcategory already selected and belongs to current category
      const isSubValid = selectedCategory.sub_categories.some(
        (sub) => sub.id === selectedSubcategory?.id
      );

      if (!isSubValid) {
        const defaultSub =
          selectedCategory.sub_categories.find((s) => s.id === 'all') ||
          selectedCategory.sub_categories[0];

        setSelectedSubcategory(defaultSub);
        setSubcategorySelection(defaultSub);
        onSubcategorySelect?.(defaultSub);
      }
    } else {
      setActiveSubcategories(null);
      setSelectedSubcategory(null);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: ICategory) => {
    const subcategories = category.sub_categories || null;
    setCategorySelection(category, subcategories ?? undefined);
    onCategorySelect?.(category, subcategories);
  };

  const handleSubcategoryClick = (sub: ISubcategory) => {
    if (!selectedCategory) return;

    setSelectedSubcategory(sub);
    setSubcategorySelection(sub);
    onSubcategorySelect?.(sub);
    onCategorySelect?.(selectedCategory, selectedCategory.sub_categories || null);
  };

  return (
    <div className="category-sticky sticky top-0 z-40 w-full mb-3">
      <div className="px-4 md:px-[9rem]">
        {/* Parent Category Bar */}
        {(!categories || categories.length === 0) ? (
          <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2 bg-primary">
            <div className="w-full text-white text-sm">
              Không thể tải danh mục
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2 bg-primary">
            {categories.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id;

              return (
                <div
                  key={cat.id}
                  className={cn(
                    'flex items-center rounded-full transition-colors duration-200',
                    isSelected
                      ? 'bg-white text-primary'
                      : 'text-white hover:text-primary hover:bg-white'
                  )}
                >
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                  >
                    {cat.name}
                    {isSelected && <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Subcategory Bar */}
        {activeSubcategories && activeSubcategories.length > 0 && (
          <div className="border-t border-slate-200 bg-white shadow-sm">
            <div className="flex items-center overflow-x-auto space-x-2 px-4 py-3 scrollbar-hide">
              {activeSubcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleSubcategoryClick(sub)}
                  className={cn(
                    'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out whitespace-nowrap transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1',
                    selectedSubcategory?.id === sub.id
                      ? sub.id === 'all'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg border-0 focus:ring-indigo-300'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md border-0 focus:ring-blue-300'
                      : sub.id === 'all'
                        ? 'bg-white text-indigo-700 border-2 border-indigo-200 shadow-sm hover:border-indigo-300 hover:bg-indigo-50 focus:ring-indigo-200'
                        : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-200'
                  )}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHorizontalBar;