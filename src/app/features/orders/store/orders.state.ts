import { ReceiptData } from '../../pos/models/receipt-data';

export interface OrdersState {
  orders: ReceiptData[];
}

export const initialOrdersState: OrdersState = {
  orders: []
};