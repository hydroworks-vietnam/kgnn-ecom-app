import api from '@/services/api-client';
import type { SubCategory } from '@/services/types';

export const subCategoriesService = {
  /** List sub-categories filtered by a parent category UUID */
  list: (category_id: string) =>
    api
      .get<SubCategory[]>('/v1/sub-categories', { params: { category_id } })
      .then((r) => r.data),

  /** Get a single sub-category by UUID */
  get: (id: string) =>
    api.get<SubCategory>(`/v1/sub-categories/${id}`).then((r) => r.data),
};

export default subCategoriesService;
