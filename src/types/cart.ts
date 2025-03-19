import type { IProduct } from "./product";

export type SelectedOptions = Record<string, string | string[]>;

export interface ICartItem {
  product: IProduct;
  options: SelectedOptions;
  quantity: number;
}

export type ICart = ICartItem[];