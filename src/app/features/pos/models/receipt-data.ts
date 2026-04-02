import { CartItem } from "./cart-item";
import { PaymentMethod } from "./payment-method";

export interface ReceiptData {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountReceived?: number;
  change?: number;
  transactionDate: string;
}