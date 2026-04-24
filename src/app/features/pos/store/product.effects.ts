import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as ProductActions from './product.actions';
import { PRODUCTS } from '../data/products.mock';

@Injectable()
export class ProductEffects {

  private actions$ = inject(Actions);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      map(() =>
        ProductActions.loadProductsSuccess({ products: PRODUCTS })
      )
    )
  );
}