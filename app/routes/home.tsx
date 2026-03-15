import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import Layout from '~/components/Layout';
import ProductCard from '@/components/Card/ProductCard';
import { fetchFeaturedProducts } from '@/services/productService';
import categoryService from '@/services/categoryService';
import type { ICategory } from '@/services/categoryService';
import type { IProduct } from '@/types/product';
import { cn } from '@/utils/helpers';
import {
  Wrench,
  LayoutGrid,
  Sprout,
  Droplets,
  Shield,
  Headphones,
  Truck,
  BadgePercent,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';

export function meta() {
  return [
    { title: 'Không Gian Nhà Nông - Thiết Bị Thủy Canh' },
    {
      name: 'description',
      content:
        'Không Gian Nhà Nông - Xây dựng và chuyển giao kỹ thuật trang trại thủy canh quy mô thương mại. Thiết bị, mô hình, hạt giống và dung dịch thủy canh chất lượng cao.',
    },
  ];
}

// --- Scroll reveal hook (Intersection Observer, inspired by 21st.dev scroll-animation patterns) ---

function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        } else {
          el.classList.remove('revealed');
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

// --- Animated counter hook (counts up when visible, inspired by 21st.dev counter components) ---

function useAnimatedCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset and start animation
          setCount(0);
          const startTime = performance.now();
          
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        } else {
          // Reset when not visible
          setCount(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// --- Static data ---

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'thiet-bi': Wrench,
  'mo-hinh': LayoutGrid,
  'hat-giong': Sprout,
  'dung-dich': Droplets,
};

const CATEGORY_SHORT_NAMES: Record<string, string> = {
  'thiet-bi': 'Thiết Bị',
  'mo-hinh': 'Mô Hình',
  'hat-giong': 'Hạt Giống',
  'dung-dich': 'Dung Dịch',
};

interface WhyUsCardData {
  icon: React.ElementType;
  title: string;
  description: string;
}

const WHY_CHOOSE_US: WhyUsCardData[] = [
  {
    icon: Shield,
    title: 'Chất Lượng Đảm Bảo',
    description: 'Sản phẩm chính hãng, vật liệu bền bỉ',
  },
  {
    icon: Headphones,
    title: 'Hỗ Trợ Kỹ Thuật',
    description: 'Tư vấn miễn phí từ chuyên gia thủy canh',
  },
  {
    icon: Truck,
    title: 'Giao Hàng Nhanh',
    description: 'Giao hàng toàn quốc, đóng gói cẩn thận',
  },
  {
    icon: BadgePercent,
    title: 'Giá Tốt Nhất',
    description: 'Giá cạnh tranh, nhiều ưu đãi hấp dẫn',
  },
];

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { target: 100, suffix: '+', label: 'Dự án hoàn thành' },
  { target: 500, suffix: '+', label: 'Sản phẩm' },
  { target: 1000, suffix: '+', label: 'Khách hàng' },
  { target: 98, suffix: '%', label: 'Hài lòng' },
];

// --- Stat counter component ---

function AnimatedStat({ target, suffix, label }: StatConfig) {
  const { count, ref } = useAnimatedCounter(target);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count}{suffix}
      </p>
      <p className="text-sm md:text-base text-white/85">
        {label}
      </p>
    </div>
  );
}

// --- Main component ---

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const categorySectionRef = useScrollReveal<HTMLDivElement>();
  const productsSectionRef = useScrollReveal<HTMLDivElement>();
  const whyUsSectionRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    fetchFeaturedProducts(8)
      .then((data) => setProducts(data))
      .finally(() => setIsLoadingProducts(false));

    categoryService
      .fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setIsLoadingCategories(false));
  }, []);

  const handleAddToCart = useCallback((_product: IProduct, _quantity: number) => {
    // Cart logic is handled internally by ProductCard via useCartStore
  }, []);

  const handleProductClick = useCallback((_product: IProduct) => {
    // Navigate could be added here for product detail page
  }, []);

  return (
    <Layout>
      {/* Hero Section — staggered fade-in-up animations */}
      <section
        className={cn(
          '-mx-4 md:-mx-8 lg:-mx-36',
          'relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden'
        )}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[fade-in-scale_1.2s_ease-out_both]"
          style={{
            backgroundImage:
              'url(https://www.thietbithuycanh.vn/wp-content/uploads/2019/12/H%E1%BB%87-Th%E1%BB%91ng-Th%E1%BB%A7y-Canh-D%E1%BA%A1ng-B%C3%A0n-5-%E1%BB%90ng-3-M%C3%A9t-.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-yellow-400/80" />
        <div className="relative z-10 text-center px-4 py-16 md:py-24 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg animate-fade-in-up">
            Không Gian Nhà Nông
          </h1>
          <p className="text-base md:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            Xây dựng và chuyển giao kỹ thuật trang trại thủy canh quy mô thương mại
          </p>
          <Link
            to="/products"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-3.5 rounded-full',
              'bg-white text-primary font-semibold text-base md:text-lg',
              'hover:bg-gray-50 hover:shadow-xl transition-all duration-300',
              'shadow-lg animate-fade-in-up'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            Khám phá sản phẩm
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Category Showcase — scroll reveal with staggered children */}
      <section className="py-12 md:py-16">
        <div ref={categorySectionRef} className="scroll-reveal">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Danh Mục Sản Phẩm
            </h2>
            <div className="mt-3 w-16 h-1 bg-primary rounded-full mx-auto animate-width-grow" />
          </div>

          {isLoadingCategories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-40 rounded-2xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const IconComponent =
                  CATEGORY_ICONS[category.id] || LayoutGrid;
                const shortName =
                  CATEGORY_SHORT_NAMES[category.id] || category.name;
                const subcategoryCount =
                  category.subcategories?.length ?? 0;

                return (
                  <Link
                    key={category.id}
                    to="/products"
                    className={cn(
                      'group flex flex-col items-center justify-center gap-3 p-6',
                      'rounded-2xl shadow-sm border border-gray-100',
                      'bg-white hover:bg-emerald-50',
                      'hover:shadow-lg hover:border-emerald-200',
                      'hover:-translate-y-1',
                      'transition-all duration-300'
                    )}
                    style={{ transitionDelay: `${index * 75}ms` }}
                  >
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center',
                        'bg-emerald-50 group-hover:bg-emerald-100',
                        'group-hover:scale-110',
                        'transition-all duration-300'
                      )}
                    >
                      <IconComponent className="w-7 h-7 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors duration-300 text-center">
                      {shortName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {subcategoryCount} danh mục con
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products — scroll reveal */}
      <section className="py-12 md:py-16">
        <div ref={productsSectionRef} className="scroll-reveal">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Sản Phẩm Nổi Bật
            </h2>
            <div className="mt-3 w-16 h-1 bg-primary rounded-full mx-auto" />
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-2xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                'border-2 border-primary text-primary font-semibold',
                'hover:bg-primary hover:text-white',
                'transition-all duration-300'
              )}
            >
              Xem tất cả sản phẩm
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us — scroll reveal with hover lift */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 bg-gray-50 py-12 md:py-16">
        <div className="px-4 md:px-8 lg:px-36">
          <div ref={whyUsSectionRef} className="scroll-reveal">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Tại Sao Chọn Chúng Tôi
              </h2>
              <div className="mt-3 w-16 h-1 bg-primary rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_US.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className={cn(
                      'flex flex-col items-center text-center p-6',
                      'bg-white rounded-2xl shadow-sm',
                      'hover:shadow-lg hover:-translate-y-1',
                      'transition-all duration-300'
                    )}
                    style={{ transitionDelay: `${index * 75}ms` }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip — animated counters */}
      <section className="-mx-4 md:-mx-8 lg:-mx-36 bg-primary">
        <div className="px-4 md:px-8 lg:px-36 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
