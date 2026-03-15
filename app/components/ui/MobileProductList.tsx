import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.fetchProducts(currentPage, 12, selectedCategory || undefined),
          categoryService.fetchCategories(),
        ]);
        setProducts(productsData.products);
        setTotalProducts(productsData.total);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, selectedCategory]);

  const totalPages = Math.ceil(totalProducts / 12);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      <div className="lg:hidden mb-8">
        <CategoryStripbar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
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
