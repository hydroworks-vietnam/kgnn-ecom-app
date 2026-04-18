export interface IProductVariant {
  rank: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface IProduct {
  id: string;
  sku?: string;
  name: string;
  /** Primary display price (numeric, parsed from API string) */
  unit_price: number;
  /** Discount/promotional price if set */
  discount_price?: number | null;
  /** The first category ID for backward-compat filtering */
  category_id: string;
  /** All category IDs from the API */
  category_ids?: string[];
  /** All sub-category IDs from the API */
  sub_category_ids?: string[];
  images: string[];
  unit: string;
  price_variants: IProductVariant[];
  description: string;
  video_link: string;
  brand?: string;
  origin?: string;
  stock_quantity?: number;
}

export interface IProductListResponse {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
}
