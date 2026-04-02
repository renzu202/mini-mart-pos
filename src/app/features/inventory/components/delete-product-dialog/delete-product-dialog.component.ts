import { Component, Inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { deleteProduct } from '../../../pos/store/product.actions';
import * as ProductActions from '../../../pos/store/product.actions';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatButton
],
  templateUrl: './delete-product-dialog.component.html',
  styleUrl: './delete-product-dialog.component.css'
})
export class DeleteProductDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {productId: number; name: string},
    private dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    private store: Store,
    private toastr: ToastrService
){}

  close(): void {
    this.dialogRef.close();
  }

  deleteProduct(productId: number) {
    this.store.dispatch(ProductActions.deleteProduct({productId}));
    this.toastr.success('Product Deleted');
    this.dialogRef.close();
  }

}
