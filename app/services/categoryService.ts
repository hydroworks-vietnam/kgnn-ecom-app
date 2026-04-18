/**
 * categoryService.ts
 *
 * Thin adapter that exposes the legacy `ICategory` interface consumed by
 * existing components while delegating to the real API via `categoriesService`.
 *
 * The API `Category` type has `id`, `name`, and `image_link`.
 * The legacy `ICategory` type adds `subcategories?: ICategory[]`.
 * Sub-categories are fetched lazily per category when needed.
 */
import categoriesService from '@/services/categories';
import subCategoriesService from '@/services/sub-categories';
import type { Category, SubCategory } from '@/services/types';

export interface ICategory {
  id: string;
  name: string;
  image_link?: string;
  subcategories?: ICategory[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toICategory(cat: Category, subs: SubCategory[] = []): ICategory {
  return {
    id: cat.id,
    name: cat.name,
    image_link: cat.image_link,
    subcategories: subs.map((s) => ({ id: s.id, name: s.name })),
  };
}

// ---------------------------------------------------------------------------
// Public service
// ---------------------------------------------------------------------------

const categoryService = {
  /**
   * Fetch all categories with their sub-categories.
   * Sub-categories are loaded in parallel for all categories.
   */
  fetchCategories: async (): Promise<ICategory[]> => {
    const categories = await categoriesService.list();

    // Fetch sub-categories for all categories in parallel
    const subResults = await Promise.allSettled(
      categories.map((cat) => subCategoriesService.list(cat.id)),
    );

    return categories.map((cat, idx) => {
      const result = subResults[idx];
      const subs = result.status === 'fulfilled' ? result.value : [];
      return toICategory(cat, subs);
    });
  },

  /** Fetch a single category (no sub-categories) */
  fetchCategory: async (id: string): Promise<ICategory | null> => {
    try {
      const cat = await categoriesService.get(id);
      return toICategory(cat);
    } catch {
      return null;
    }
  },
};

export default categoryService;
