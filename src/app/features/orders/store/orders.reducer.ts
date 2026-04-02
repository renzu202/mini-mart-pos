import { createReducer, on } from '@ngrx/store';
import { initialOrdersState } from './orders.state';
import * as OrdersActions from './orders.actions';

export const ordersReducer = createReducer(
  initialOrdersState,

  on(OrdersActions.addOrder, (state, { order }) => ({
    ...state,
    orders: [order, ...state.orders]
  })),

  on(OrdersActions.deleteOrder, (state, { orderId }) => ({
    ...state,
    orders: state.orders.filter(order => order.orderId !== orderId)
  })),

  on(OrdersActions.clearOrders, state => ({
    ...state,
    orders: []
  }))
);