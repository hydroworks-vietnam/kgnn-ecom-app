// hooks/useCategories.ts
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  $categories,
  $selectedCategory,
  $selectedSubcategory,
  $latestProducts,
  fetchCategories,
  setCategorySelection,
  setSubcategorySelection,
  setLatestProducts,
  clearCategorySelection,
} from '@/store/category';

export const useCategories = () => {
  const categories = useStore($categories);
  const selectedCategory = useStore($selectedCategory);
  const latestProducts = useStore($latestProducts);

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    selectedCategory,
    $selectedSubcategory,
    latestProducts,
    fetchCategories,
    setCategorySelection,
    setSubcategorySelection,
    setLatestProducts,
    clearCategorySelection,
  };
};