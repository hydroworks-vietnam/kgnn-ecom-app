import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import type { ICategory } from '~/services/categoryService';

interface CategoryStripProps {
  categories: ICategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryStripbar: React.FC<CategoryStripProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getSubcategories = (categoryId: string): ICategory[] => {
    const findInTree = (cats: ICategory[]): ICategory[] => {
      for (const cat of cats) {
        if (cat.id === categoryId && cat.subcategories) {
          return cat.subcategories;
        }
        if (cat.subcategories) {
          const result = findInTree(cat.subcategories);
          if (result.length > 0) return result;
        }
      }
      return [];
    };
    return findInTree(categories);
  };
  
  const isActiveCategory = (category: ICategory): boolean => {
    if (category.id === selectedCategory) return true;
    if (category.subcategories) {
      return category.subcategories.some(sub => isActiveCategory(sub));
    }
    return false;
  };

  const subcategories = expandedCategory ? getSubcategories(expandedCategory) : [];

  return (
    <div className="shadow-md -mx-4 md:-mx-8 lg:-mx-36 bg-white">
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-36 py-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                if (category.subcategories && category.subcategories.length > 0) {
                  setExpandedCategory(category.id);
                }
                
                if (!isActiveCategory(category)) {
                  onSelectCategory(category.id);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0 ${isActiveCategory(category)
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${expandedCategory === category.id ? 'rotate-180' : ''
                    }`}
                />
              )}
            </button>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      <hr />

      {subcategories.length > 0 && (
        <div className="bg-white p-4 md:px-8 lg:px-36">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => {
                  if (selectedCategory !== subcategory.id) {
                    onSelectCategory(subcategory.id);
                  }
                }}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${selectedCategory === subcategory.id
                    ? 'bg-emerald-100 text-emerald-700 font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};