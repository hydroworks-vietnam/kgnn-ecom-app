export interface IProduct {
  id: string;
  sku: string;
  name: string;
  unit_price: number;
  price_variants?: {
    rank: string;
    price: number;
  }[];
  unit_type: string;
  stock: number;
  brand: string;
  origin: string;
  description?: string;
  images: string[];
  category_id: string;
  sub_category_id?: string;
  video_link: string;
}

export interface ICategory {
  id: string;
  name: string;
  sub_categories: ISubcategory[];
}

export interface ISubcategory {
  id: string;
  name: string;
  cat_id: string;
}