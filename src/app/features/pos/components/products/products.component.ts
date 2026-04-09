import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ProductCardComponent } from '../product-card/product-card.component';
import { PRODUCTS } from '../../data/products.mock';
import { Product } from '../../models/product';
import * as CartActions from '../../store/cart.actions';
import * as ProductActions from '../../store/product.actions';
import { selectAllProducts } from '../../store/product.selector';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products$: Observable<Product[]>;
  searchTerm = '';
  selectedCategories: 'all' | 'snacks' | 'drinks' | 'instant' | 'essentials' = 'all';
  isMobile = false;

   constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
   ) {
    this.products$ = this.store.select(selectAllProducts);
   }

  setCategory(category: 'all' | 'snacks' | 'drinks' | 'instant' | 'essentials'): void {
    this.selectedCategories = category;
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product }));
    this.store.dispatch(ProductActions.decreaseStock({ productId: product.id }));
  }


  filteredProducts(products: Product[]): Product[] {
    return products.filter(product => {
      const matchesCategory =
        this.selectedCategories === 'all' ||
        product.category === this.selectedCategories;

      const matchesSearchTerm =
        product.name.toLowerCase().includes(
          this.searchTerm.toLowerCase().trim()
        );

      return matchesCategory && matchesSearchTerm;
    });
  }

  ngOnInit(){
    this.breakpointObserver.observe(['(max-width: 480px)'])
    .subscribe(result => {
      this.isMobile = result.matches
    })
  }

}