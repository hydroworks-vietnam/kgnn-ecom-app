/**
 * productService.ts
 *
 * Thin adapter that maps the API `Product` shape to the legacy `IProduct`
 * interface used by existing UI components, adding client-side category
 * filtering support (since the list endpoint does not filter by category).
 */
import productsService from '@/services/products';
import type { Product } from '@/services/types';
import type { IProduct, IProductListResponse, IProductVariant } from '@/types/product';

// ---------------------------------------------------------------------------
// Adapter helpers
// ---------------------------------------------------------------------------

function parsePrice(value: string | undefined | null): number {
  if (!value) return 0;
  return parseFloat(value) || 0;
}

function toIProductVariant(pv: { rank: string; price: string }): IProductVariant {
  return {
    rank: pv.rank,
    price: parsePrice(pv.price),
    unit: '',      // API PriceVariant does not include unit/quantity — use defaults
    quantity: 1,
  };
}

function toIProduct(p: Product): IProduct {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    unit_price: parsePrice(p.unit_price),
    discount_price: p.discount_price != null ? parsePrice(p.discount_price) : null,
    // Use first category_id for legacy single-category filtering
    category_id: p.category_ids?.[0] ?? '',
    category_ids: p.category_ids ?? [],
    sub_category_ids: p.sub_category_ids ?? [],
    images: p.images ?? [],
    unit: p.unit,
    price_variants: (p.price_variants ?? []).map(toIProductVariant),
    description: p.description ?? '',
    video_link: p.video_link ?? '',
    brand: p.brand,
    origin: p.origin,
    stock_quantity: p.stock_quantity,
  };
}

// ---------------------------------------------------------------------------
// Category filtering (client-side — API doesn't expose a category filter param)
// ---------------------------------------------------------------------------

function matchesCategory(
  product: IProduct,
  categoryId: string | string[] | undefined,
): boolean {
  if (!categoryId) return true;
  const ids = Array.isArray(categoryId) ? categoryId : [categoryId];
  if (ids.length === 0) return true;
  const productCats = [
    product.category_id,
    ...(product.category_ids ?? []),
    ...(product.sub_category_ids ?? []),
  ].filter(Boolean);
  return ids.some((id) => productCats.includes(id));
}

// ---------------------------------------------------------------------------
// Public service API (same shape as the old mock service)
// ---------------------------------------------------------------------------

export const fetchProducts = async (
  page: number = 1,
  limit: number = 12,
  categoryId?: string | string[],
): Promise<IProductListResponse> => {
  // Fetch a broad page so client-side category filter doesn't deplete results.
  // TODO: replace with a server-side filter param once the API supports it.
  const allProducts = await productsService.list({ limit: 1000, offset: 0 });
  const mapped = allProducts.map(toIProduct);

  const filtered = categoryId
    ? mapped.filter((p) => matchesCategory(p, categoryId))
    : mapped;

  const start = (page - 1) * limit;
  const paginatedProducts = filtered.slice(start, start + limit);

  return {
    products: paginatedProducts,
    total: filtered.length,
    page,
    limit,
  };
};

export const fetchProductById = async (id: string): Promise<IProduct | null> => {
  try {
    const product = await productsService.get(id);
    return toIProduct(product);
  } catch {
    return null;
  }
};

export const fetchFeaturedProducts = async (limit: number = 4): Promise<IProduct[]> => {
  const products = await productsService.list({ limit, offset: 0 });
  return products.map(toIProduct);
};

const productService = {
  fetchProducts,
  fetchProductById,
  fetchFeaturedProducts,
};

export default productService;
