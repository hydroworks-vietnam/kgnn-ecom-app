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
  images: string[];
  unit: string;
  price_variants: IProductVariant[];
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
}

export type ICart = ICartItem[];