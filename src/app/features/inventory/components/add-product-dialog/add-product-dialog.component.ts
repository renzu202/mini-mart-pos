import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../../../pos/models/product';
import * as ProductActions from '../../../pos/store/product.actions';
import { AVAILABLE_PRODUCTS, AvailableProduct } from '../../data/available-products.mock';
import { selectAllProducts } from '../../../pos/store/product.selector';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.css'
})
export class AddProductDialogComponent {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  private readonly toastr = inject(ToastrService);

  availableProducts = AVAILABLE_PRODUCTS;
  products$: Observable<Product[]> = this.store.select(selectAllProducts);

  form = new FormGroup({
    selectedProduct: new FormControl<AvailableProduct | null>(null, {
      validators: [Validators.required]
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)]
    }),
    stock: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)]
    })
  });

  saveProduct(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const selectedProduct = formValue.selectedProduct;
    const price = formValue.price;
    const stock = formValue.stock;

    if (!selectedProduct || price === null || stock === null) {
      return;
    }

    this.products$.pipe(take(1)).subscribe(products => {
      const exists = products.some(
        p => p.name.toLowerCase() === selectedProduct.name.toLowerCase()
      );

      if (exists) {
        this.toastr.error('Product already exists');
        return;
      }

      const newProduct: Product = {
        id: Date.now(),
        name: selectedProduct.name,
        image: selectedProduct.image,
        category: selectedProduct.category,
        price,
        stock
      };

      this.store.dispatch(ProductActions.addProduct({ product: newProduct }));
      this.toastr.success('Product Added');
      this.dialogRef.close();
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}