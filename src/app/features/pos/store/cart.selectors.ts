import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';
import { selectProductState } from './product.selector';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  state => state.items
);

export const selectCartItemsWithStock = createSelector(
  selectCartItems,
  selectProductState,
  (cartItems, productState) => {
    return cartItems.map(item => {
      const product = productState.products.find(p => p.id === item.id);

      return {
        ...item,
        stock: product ? product.stock : 0
      };
    });
  }
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  items => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubTotal = createSelector(
  selectCartItems,
  items => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartTax = createSelector(
  selectCartSubTotal,
  subtotal => subtotal * 0.03
);

export const selectCartGrandTotal = createSelector(
  selectCartSubTotal,
  selectCartTax,
  (subtotal, tax) => subtotal + tax
);