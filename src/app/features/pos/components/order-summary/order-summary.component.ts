import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { selectCartGrandTotal, selectCartSubTotal, selectCartTax, selectCartItems } from '../../store/cart.selectors';
import { MatDialog } from '@angular/material/dialog'
import { CartItem } from '../../models/cart-item';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-summary',
  imports: [
    MatIconModule,
    AsyncPipe,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  cartItems$: Observable<CartItem[]>;
  subtotal$: Observable<number>;
  tax$: Observable<number>;
  total$: Observable<number>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.cartItems$ = this.store.select(selectCartItems);
    this.subtotal$ = this.store.select(selectCartSubTotal)
    this.tax$ = this.store.select(selectCartTax);
    this.total$ = this.store.select(selectCartGrandTotal);
  }

  openCheckoutDialog(): void {
    combineLatest([
      this.cartItems$.pipe(take(1)),
      this.subtotal$.pipe(take(1)),
      this.tax$.pipe(take(1)),
      this.total$.pipe(take(1))
    ]).subscribe(([items, subtotal, tax, total]) => {
      if (!items.length) {
        console.log('showing toast');
        this.toastr.error('You need to select item first!');
        return;
      }

      this.dialog.open(CheckoutDialogComponent, {
        width: '520px',
        disableClose: true,
        data: {
          items,
          subtotal,
          tax,
          total
        }
      });
    });
  }

}
