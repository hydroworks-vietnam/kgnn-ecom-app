import api from '@/services/api-client';
import type { Category } from '@/services/types';

export const categoriesService = {
  /** List all categories */
  list: () => api.get<Category[]>('/v1/categories').then((r) => r.data),

  /** Get a single category by UUID */
  get: (id: string) =>
    api.get<Category>(`/v1/categories/${id}`).then((r) => r.data),
};

export default categoriesService;
