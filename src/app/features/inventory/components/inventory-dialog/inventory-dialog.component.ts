import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../../pos/models/product';
import { selectAllProductsDesc } from '../../../pos/store/product.selector';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';
import * as ProductActions from '../../../pos/store/product.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory-dialog',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './inventory-dialog.component.html',
  styleUrl: './inventory-dialog.component.css'
})
export class InventoryDialogComponent {
  products$: Observable<Product[]>;

  constructor(
    private toastr: ToastrService,
    private store: Store,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<InventoryDialogComponent>
  ) {
    this.products$ = this.store.select(selectAllProductsDesc);
  }

  openAddProductDialog(): void {
    this.dialog.open(AddProductDialogComponent, {
      width: '500px'
    });
  }

  openEditProductDialog(product: Product): void {
    this.dialog.open(EditProductDialogComponent, {
      width: '500px',
      data: product
    });
  }

  openDeleteDialog(productId: number, name: string): void {
    this.dialog.open(DeleteProductDialogComponent, {
      width: '500px',
      data: { productId, name }
    });
  }

  deleteProduct(productId: number): void {

    if (!confirm('Do you want to delete this product?')){
      return;
    }

    this.store.dispatch(ProductActions.deleteProduct({ productId }));
    this.toastr.success('Product Deleted');
  }

  close(){
    this.dialogRef.close();
  }

}