import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  state => state.products
);

export const selectAllProductsDesc = createSelector(
  selectProductState,
  state => [...state.products].sort((a, b) => b.id - a.id)
);