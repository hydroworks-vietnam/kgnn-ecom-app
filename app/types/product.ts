export interface IProductVariant {
  rank: string;
  price: number;
  unit: string;
  quantity: number;
}

export interface IProduct {
  id: string;
  name: string;
  unit_price: number;
  category_id: string;
  images: string[];
  unit: string;
  price_variants: IProductVariant[];
  description: string;
  video_link: string;
}

export interface IProductListResponse {
  products: IProduct[];
  total: number;
  page: number;
  limit: number;
}
