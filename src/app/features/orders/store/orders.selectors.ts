import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrdersState } from './orders.state';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

export const selectOrders = createSelector(
  selectOrdersState,
  state => state.orders
);

export const selectOrdersCount = createSelector(
  selectOrders,
  orders => orders.length
);