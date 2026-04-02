import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CartItem } from '../../models/cart-item';
import * as CartActions from '../../store/cart.actions';
import * as ProductActions from '../../store/product.actions';
import { selectCartItemsWithStock } from '../../store/cart.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-items',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart-items.component.html',
  styleUrl: './cart-items.component.css'
})
export class CartItemsComponent {
  cartItems$: Observable<CartItem[]>;

  constructor(
    private store: Store,
    private toastr: ToastrService
  ) {
    this.cartItems$ = this.store.select(selectCartItemsWithStock);
  }

  increaseQuantity(productId: number, stock: number): void {

    if (stock === 0) {
      this.toastr.error('Out of stock');
      return;
    }

    this.store.dispatch(CartActions.increaseQuantity({ productId }));
    this.store.dispatch(ProductActions.decreaseStock({ productId }));
  }

  decreaseQuantity(productId: number): void {
    this.store.dispatch(CartActions.decreaseQuantity({ productId }));
    this.store.dispatch(ProductActions.increaseStock({ productId }));
  }

  removeFromCart(item: CartItem): void {
    this.store.dispatch(CartActions.removeFromCart({ productId: item.id }));
    this.store.dispatch(ProductActions.restoreStock({
      item: { id: item.id, quantity: item.quantity }
    }));
  }
}