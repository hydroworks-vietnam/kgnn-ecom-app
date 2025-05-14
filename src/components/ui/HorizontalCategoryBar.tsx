import React, { useState, useEffect, useRef } from 'react';
import { getCategories } from '@/services/categoryService';
import { getLatestProducts } from '@/services/productService';
import type { ICategory, ISubcategory } from '@/types/product';
import { cx } from 'class-variance-authority';

interface HorizontalCategoryBarProps {
  onCategorySelect: (category: ICategory, subcategory?: ISubcategory) => void;
  onLatestProductsSelect?: (products: any[]) => void;
}

const HorizontalCategoryBarSkeleton: React.FC = () => {
  return (
    <div className="flex space-x-2 mb-4">
      {Array(4).fill(0).map((_, index) => (
        <div key={`cat-skeleton-${index}`} className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  );
};

const HorizontalCategoryBar: React.FC<HorizontalCategoryBarProps> = ({ onCategorySelect, onLatestProductsSelect }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<ISubcategory | null>(null);
  const [isNewArrivalsActive, setIsNewArrivalsActive] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const navItemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const newArrivalsRef = useRef<HTMLButtonElement | null>(null);

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
          setSelectedCategory(processedCategories[0] || null);
          setSelectedSubcategory((processedCategories[0]?.sub_categories[0]) || null);
          if (processedCategories[0]) {
            onCategorySelect(processedCategories[0], processedCategories[0].sub_categories[0]);
          }
        } else {
          setError('Chưa có danh mục nào');
        }
      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === 'object' && error.error?.message
              ? error.error.message
              : 'Đã có lỗi trong quá trình xử lí, vui lòng thử lại';
        console.error('Error fetching categories:', error);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(dropdownRef.current).every(
        (ref) => !ref || !ref.contains(event.target as Node)
      );
      if (clickedOutside) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Handle sticky behavior
    const handleScroll = () => {
      if (!menuRef.current || !menuContainerRef.current) return;

      const containerRect = menuContainerRef.current.getBoundingClientRect();
      const shouldBeSticky = containerRect.top <= 0;

      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSticky]);

  useEffect(() => {
    // Handle window resize for dropdown positioning
    const handleResize = () => {
      if (activeDropdown) positionDropdown();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeDropdown]);

  useEffect(() => {
    if (activeDropdown) {
      positionDropdown();
    }
  }, [activeDropdown]);

  const positionDropdown = () => {
    if (!activeDropdown) return;

    const button = document.querySelector(`[data-category="${activeDropdown}"]`) as HTMLElement;
    const dropdownEl = dropdownRef.current[activeDropdown];

    if (!button || !dropdownEl) return;

    const buttonRect = button.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    let leftPosition = buttonRect.left;
    const dropdownWidth = Math.max(buttonRect.width, 150); // Min width of 150px
    const maxLeft = windowWidth - dropdownWidth - 5;

    if (leftPosition > maxLeft) {
      leftPosition = maxLeft;
    } else if (leftPosition < 0) {
      leftPosition = 0;
    }

    dropdownEl.style.position = 'fixed';
    dropdownEl.style.top = `${buttonRect.bottom}px`;
    dropdownEl.style.left = `${leftPosition}px`;
    dropdownEl.style.width = `${dropdownWidth}px`;
    dropdownEl.style.minWidth = '150px';
    dropdownEl.style.maxHeight = '300px';
    dropdownEl.style.overflowY = 'auto';
  };

  // Function to ensure the selected item is visible
  const scrollToVisibleItem = (itemKey: string) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let targetRef;

    if (itemKey === 'new-arrivals') {
      targetRef = newArrivalsRef.current;
    } else {
      targetRef = navItemRefs.current[itemKey];
    }

    if (!targetRef) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = targetRef.getBoundingClientRect();

    // Check if item is not visible
    const isVisible =
      targetRect.left >= containerRect.left &&
      targetRect.right <= containerRect.right;

    if (!isVisible) {
      // Calculate the scroll position to make the item visible
      // Center the item if possible
      const scrollLeft = targetRect.left + container.scrollLeft - containerRect.left - (containerRect.width / 2) + (targetRect.width / 2);
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category: ICategory) => {
    scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0;
    setSelectedCategory(category);
    setIsNewArrivalsActive(false);

    if (activeDropdown === category.id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(category.id);
      setSelectedSubcategory(null);
    }

    scrollToVisibleItem(category.id);
  };

  const handleSubcategorySelect = (subcategory: ISubcategory) => {
    scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0;
    setSelectedSubcategory(subcategory);
    setIsNewArrivalsActive(false);
    setActiveDropdown(null);

    if (selectedCategory) {
      onCategorySelect(selectedCategory, subcategory);
    }
  };

  const handleNewArrivalsClick = async () => {
    scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0;
    try {
      setIsLoading(true);
      const latestProducts = await getLatestProducts(3);
      setIsNewArrivalsActive(true);
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setActiveDropdown(null);

      if (onLatestProductsSelect) {
        onLatestProductsSelect(latestProducts);
      }

      // Ensure "New Arrivals" button is visible after click
      scrollToVisibleItem('new-arrivals');
    } catch (error: any) {
      console.error('Error fetching latest products:', error);
      setError('Failed to fetch latest products');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative" ref={menuContainerRef}>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .sticky-nav {
            position: fixed;
            top: 0;
            z-index: 50;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }
        `}
      </style>

      <div
        ref={menuRef}
        style={{
          width: isSticky && menuContainerRef.current ? menuContainerRef.current.offsetWidth + 'px' : '100%'
        }}
        className={cx(
          "bg-primary text-white p-2 flex justify-between items-center",
          isSticky ? "sticky-nav" : ""
        )}
      >
        <div
          ref={scrollContainerRef}
          className="flex space-x-2 overflow-x-auto hide-scrollbar"
          onScroll={() => {
            scrollPositionRef.current = scrollContainerRef.current?.scrollLeft || 0;
          }}
        >
          {isLoading ? (
            <HorizontalCategoryBarSkeleton />
          ) : error ? (
            <div className="p-2">{error}</div>
          ) : (
            <>
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    ref={(el) => { navItemRefs.current[category.id] = el; }}
                    data-category={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={cx(
                      'px-3 py-1 rounded flex items-center whitespace-nowrap',
                      selectedCategory?.id === category.id && !isNewArrivalsActive
                        ? 'bg-white text-black font-medium'
                        : 'hover:bg-orange-600 text-white'
                    )}
                  >
                    {category.name}
                    <svg
                      className={cx(
                        'w-4 h-4 ml-1 transition-transform',
                        activeDropdown === category.id ? 'transform rotate-180' : ''
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {activeDropdown === category.id && (
                    <div
                      ref={(el) => {
                        dropdownRef.current[category.id] = el;
                      }}
                      className="fixed z-50 bg-white rounded-md shadow-lg border border-gray-200"
                    >
                      {category.sub_categories.map((subcategory) => (
                        <button
                          key={subcategory.id}
                          onClick={() => handleSubcategorySelect(subcategory)}
                          className={cx(
                            'w-full text-left px-4 py-2 text-sm',
                            selectedSubcategory?.id === subcategory.id && selectedCategory?.id === category.id
                              ? 'bg-primary text-white font-semibold'
                              : 'text-gray-600 hover:bg-gray-50'
                          )}
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                ref={newArrivalsRef}
                onClick={handleNewArrivalsClick}
                className={cx(
                  'px-3 py-1 rounded whitespace-nowrap',
                  isNewArrivalsActive ? 'bg-white text-black font-medium' : 'text-white hover:bg-orange-600'
                )}
              >
                Sản phẩm mới
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCategoryBar;