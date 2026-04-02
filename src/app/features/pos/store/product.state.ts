import { Product } from "../models/product";

export interface ProductState {
  products: Product[];
}

export const initialProductState: ProductState = {
  products: []
};