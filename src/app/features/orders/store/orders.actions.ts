import { createAction, props } from '@ngrx/store';
import { ReceiptData } from '../../pos/models/receipt-data';

export const addOrder = createAction(
  '[Orders] Add Order',
  props<{ order: ReceiptData }>()
);

export const deleteOrder = createAction(
  '[Orders] Delete Order',
  props<{ orderId: string }>()
);

export const clearOrders = createAction('[Orders] Clear Orders');