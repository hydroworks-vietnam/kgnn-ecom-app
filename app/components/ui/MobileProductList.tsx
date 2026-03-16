import React, { useState, useEffect } from 'react';
import type { IProduct } from '@/types/product';
import productService from '@/services/productService';
import categoryService from '@/services/categoryService';
import type { ICategory } from '@/services/categoryService';
import MobileProductCard from '@/components/Card/MobileProductCard';
import { CategoryStripbar } from './CategoryStripbar';

interface MobileProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
  onProductClick: (product: IProduct) => void;
  initialCategory?: { catId: string; subCatId: string } | null;
}

const MobileProductList = ({ handleAddToCart, onProductClick, initialCategory }: MobileProductListProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory?.subCatId || null);

  const getAllCategoryIds = (categoryId: string, cats: ICategory[]): string[] => {
    const ids: string[] = [categoryId];
    const findAndAdd = (items: ICategory[]) => {
      for (const item of items) {
        if (item.id === categoryId) {
          if (item.subcategories) {
            const addAll = (subs: ICategory[]) => {
              for (const sub of subs) {
                ids.push(sub.id);
                if (sub.subcategories) addAll(sub.subcategories);
              }
            };
            addAll(item.subcategories);
          }
          return true;
        }
        if (item.subcategories && findAndAdd(item.subcategories)) return true;
      }
      return false;
    };
    findAndAdd(cats);
    return ids;
  };

  const getCategoryPath = (categoryId: string, cats: ICategory[]): string[] => {
    const path: string[] = [];
    const findPath = (items: ICategory[]): boolean => {
      for (const item of items) {
        if (item.id === categoryId) {
          path.push(item.name);
          return true;
        }
        if (item.subcategories && findPath(item.subcategories)) {
          path.unshift(item.name);
          return true;
        }
      }
      return false;
    };
    findPath(cats);
    return path;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const filterIds = selectedCategory ? getAllCategoryIds(selectedCategory, categories.length ? categories : await categoryService.fetchCategories()) : undefined;
        const [productsData, categoriesData] = await Promise.all([
          productService.fetchProducts(currentPage, 10, filterIds),
          categories.length ? Promise.resolve(categories) : categoryService.fetchCategories(),
        ]);
        setProducts(productsData.products);
        setTotalProducts(productsData.total);
        if (!categories.length) setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, selectedCategory, categories.length]);

  const totalPages = Math.ceil(totalProducts / 10);
  const currentPath = selectedCategory ? getCategoryPath(selectedCategory, categories) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-2 space-y-4">
      <div className="lg:hidden">
        <CategoryStripbar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => {
            if (id === selectedCategory) return;
            setSelectedCategory(id);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-gray-400 whitespace-nowrap">Đang xem:</span>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-medium whitespace-nowrap ${!selectedCategory ? 'text-primary' : 'text-gray-600'}`}>Tất cả</span>
            {currentPath.map((name, i) => (
              <React.Fragment key={i}>
                <span className="text-gray-300 text-[10px]">&gt;</span>
                <span className="text-xs font-medium text-primary whitespace-nowrap">{name}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        {selectedCategory && (
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-[10px] text-gray-400 hover:text-primary whitespace-nowrap ml-2 underline underline-offset-2"
          >
            Xóa lọc
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <MobileProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onClick={() => onProductClick(product)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 text-sm"
          >
            Trang trước
          </button>
          
          <span className="px-3 py-2 text-sm">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50 text-sm"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileProductList;
