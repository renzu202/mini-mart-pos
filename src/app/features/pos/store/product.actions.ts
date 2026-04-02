import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

export const decreaseStock = createAction(
  '[Product] Decrease Stock',
  props<{ productId: number }>()
);

export const increaseStock = createAction(
  '[Product] Increase Stock',
  props<{ productId: number }>()
);

export const restoreStockBulk = createAction(
  '[Product] Restore Stock Bulk',
  props<{ items: { id: number; quantity: number }[] }>()
);

export const restoreStock = createAction(
  '[Product] Restore Stock',
  props<{item: {id: number; quantity: number}}>()
)

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);