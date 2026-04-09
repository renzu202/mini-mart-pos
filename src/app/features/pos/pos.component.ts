import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsComponent } from './components/products/products.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { Store } from '@ngrx/store';
import * as CartActions from './store/cart.actions';
import * as ProductActions from './store/product.actions';
import { selectCartItems } from './store/cart.selectors';
import { OrderHistoryDialogComponent } from '../orders/components/order-history-dialog/order-history-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDialogComponent } from '../inventory/components/inventory-dialog/inventory-dialog.component';

@Component({
  selector: 'app-pos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ProductsComponent,
    CartItemsComponent,
    OrderSummaryComponent
],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export class PosComponent {
  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  clearCart(): void {
  this.store.select(selectCartItems).subscribe(items => {
    this.store.dispatch(ProductActions.restoreStockBulk({
      items: items.map(i => ({ id: i.id, quantity: i.quantity }))
    }));
  }).unsubscribe();
    this.store.dispatch(CartActions.clearCart());
  }

  openOrderHistory(): void {
    this.dialog.open(OrderHistoryDialogComponent, {
      width: '650px'
    });
  }

  openInventory(): void {
  this.dialog.open(InventoryDialogComponent, {
    width: '70%',
    maxWidth: '100%'
  });
}
}
