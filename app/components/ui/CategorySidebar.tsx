import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  subcategories?: Category[];
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
      <div key={category.id}>
        <div className="flex items-center">
          <button
            onClick={() => {
              onSelectCategory(category.id);
              if (hasSubcategories) {
                toggleCategory(category.id);
              }
            }}
            className={`flex-1 text-left px-4 py-3 rounded-lg transition-all duration-200 ${isSelected
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-50'
              }`}
            style={{ paddingLeft: `${16 + level * 16}px` }}
          >
            {category.name}
          </button>
          {hasSubcategories && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="px-2 py-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''
                  }`}
              />
            </button>
          )}
        </div>

        {hasSubcategories && isExpanded && (
          <div className="space-y-0">
            {category.subcategories!.map((subcategory) =>
              renderCategory(subcategory, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white rounded-2xl shadow-sm p-6 h-fit sticky top-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Danh mục</h2>
      <div className="space-y-0">
        {categories.map((category) => renderCategory(category))}
      </div>
    </div>
  );
};