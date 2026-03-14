import { useState, useEffect } from 'react';
import type { IProduct } from '@/types/product';
import productService from '@/services/productService';
import categoryService from '@/services/categoryService';
import type { ICategory } from '@/services/categoryService';
import ProductCard from '@/components/Card/ProductCard';
import { CategoryStripbar } from './CategoryStripbar';
import { CategorySidebar } from './CategorySidebar';

interface DesktopProductListProps {
  handleAddToCart: (product: IProduct, quantity: number) => void;
  onProductClick: (product: IProduct) => void;
}

const DesktopProductList = ({ handleAddToCart, onProductClick }: DesktopProductListProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productService.fetchProducts(currentPage, 12, selectedCategory ? parseInt(selectedCategory) : undefined),
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

  const filteredProducts = products;

  const totalPages = Math.ceil(totalProducts / 12);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Sản phẩm thủy canh
          </h1>
          <p className="text-gray-600">
            Khám phá bộ sưu tập đầy đủ các thiết bị và chất dinh dưỡng để bắt đầu
            nông nghiệp thủy canh của bạn
          </p>
        </div>

        <div className="flex gap-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="flex-1">
            <div className="mb-6">
              <p className="text-sm text-primary font-medium">
                {filteredProducts.length} sản phẩm
                {selectedCategory && ' · Lọc được áp dụng'}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onClick={() => onProductClick(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Không có sản phẩm
                  </p>
                  <p className="text-gray-600">
                    Hãy thử lựa chọn danh mục khác hoặc xem tất cả sản phẩm
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProductList;
