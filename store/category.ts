import { atom, computed } from 'nanostores';
import type { ICategory, IProduct, ISubcategory } from '@/types/product';
import categoryService from '@/services/categoryService';

export const $selectedCategory = atom<ICategory | null>(null);
export const $latestProducts = atom<IProduct[]>([]);
export const $rawCategories = atom<ICategory[]>([]);

const initialized = { value: false };

// Add "Tất cả" subcategory to every category
export const $categories = computed($rawCategories, (raw) => {
  if (!raw.length) return [];

  return raw.map((cat) => ({
    ...cat,
    sub_categories: [
      { id: 'all', name: 'Tất cả', cat_id: cat.id },
      ...(cat.sub_categories || []),
    ],
  }));
});

export const $selectedSubcategory = atom<ISubcategory | null>(null);

export const setSubcategorySelection = (sub: ISubcategory | null) => {
  $selectedSubcategory.set(sub);
}

export const setCategorySelection = (
  category: ICategory | null,
  subcategories: ISubcategory[] = []
) => {
  if (!category) {
    $selectedCategory.set(null);
    return;
  }

  // Use the enriched category directly, no need to prepend "Tất cả" again
  $selectedCategory.set({
    ...category,
    sub_categories: subcategories,
  });
};

export const setLatestProducts = (products: IProduct[]) => {
  $latestProducts.set(products);
  $selectedCategory.set(null);
};

export const clearCategorySelection = () => {
  $selectedCategory.set(null);
};

export const fetchCategories = async () => {
  if (initialized.value) return;
  initialized.value = true;

  const data = await categoryService.getCategories();
  if (!Array.isArray(data)) return;

  $rawCategories.set(data);

  if (data.length > 0) {
    const firstCategory = {
      ...data[0],
      sub_categories: [
        { id: 'all', name: 'Tất cả', cat_id: data[0].id },
        ...(data[0].sub_categories || []),
      ],
    };
    setCategorySelection(firstCategory, firstCategory.sub_categories);
  }
};