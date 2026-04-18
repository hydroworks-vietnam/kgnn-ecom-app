// ---------------------------------------------------------------------------
// Shared types generated from API-SPECS.yaml (OpenAPI 3.0)
// ---------------------------------------------------------------------------

// --- Utility ---
export interface ErrorResponse {
  error: string;
}

export interface MessageResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
  database: string;
}

// --- Price Variant ---
export interface PriceVariant {
  rank: string;
  /** Decimal price value as a string, e.g. "49.99" */
  price: string;
}

// --- Category ---
export interface Category {
  id: string;
  name: string;
  image_link?: string;
}

export interface CreateCategoryRequest {
  name: string;
  image_link?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  image_link?: string;
}

// --- SubCategory ---
export interface SubCategory {
  id: string;
  name: string;
  category_id: string;
}

export interface CreateSubCategoryRequest {
  name: string;
  category_id: string;
}

export interface UpdateSubCategoryRequest {
  name?: string;
  category_id?: string;
}

// --- Product ---
export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  unit: string;
  unit_price: string;
  discount_price?: string | null;
  price_variants?: PriceVariant[] | null;
  brand?: string;
  category_ids?: string[];
  sub_category_ids?: string[];
  origin?: string;
  stock_quantity?: number;
  images?: string[];
  video_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductInput {
  sku: string;
  name: string;
  description?: string;
  unit: string;
  unit_price: string;
  discount_price?: string | null;
  price_variants?: PriceVariant[] | null;
  brand?: string;
  category_ids?: string[];
  sub_category_ids?: string[];
  origin?: string;
  stock_quantity?: number;
  images?: string[];
  video_link?: string;
}
