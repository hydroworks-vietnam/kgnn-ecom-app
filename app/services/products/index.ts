import api from '@/services/api-client';
import type { Product } from '@/services/types';

export interface ListProductsParams {
  /** Number of results to return (default 10) */
  limit?: number;
  /** Number of results to skip (default 0) */
  offset?: number;
}

export const productsService = {
  /** List products with optional pagination */
  list: (params?: ListProductsParams) =>
    api.get<Product[]>('/v1/products', { params }).then((r) => r.data),

  /** Get a single product by UUID */
  get: (id: string) =>
    api.get<Product>(`/v1/products/${id}`).then((r) => r.data),
};

export default productsService;
