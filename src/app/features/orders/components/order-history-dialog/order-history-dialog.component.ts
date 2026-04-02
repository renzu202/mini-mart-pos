import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ReceiptData } from '../../../pos/models/receipt-data';
import * as OrdersActions from '../../store/orders.actions';
import { selectOrders, selectOrdersCount } from '../../store/orders.selectors';

@Component({
  selector: 'app-order-history-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    CurrencyPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './order-history-dialog.component.html',
  styleUrl: './order-history-dialog.component.css'
})
export class OrderHistoryDialogComponent {
  orders$: Observable<ReceiptData[]>;
  ordersCount$: Observable<number>;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<OrderHistoryDialogComponent>
  ) {
    this.orders$ = this.store.select(selectOrders);
    this.ordersCount$ = this.store.select(selectOrdersCount);
  }

  deleteOrder(orderId: string): void {
    this.store.dispatch(OrdersActions.deleteOrder({ orderId }));
  }

  clearAllOrders(): void {
    this.store.dispatch(OrdersActions.clearOrders());
  }

  close(): void {
    this.dialogRef.close();
  }
}