import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { Product } from '../../../pos/models/product';
import * as ProductActions from '../../../pos/store/product.actions';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.css'
})
export class EditProductDialogComponent {
  form!: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      price: new FormControl(this.data.price, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)]
      }),
      category: new FormControl(this.data.category, {
        nonNullable: true,
        validators: [Validators.required]
      }),
      stock: new FormControl(this.data.stock, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)]
      })
    });
  }

  saveChanges(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const updatedProduct: Product = {
      ...this.data,
      name: formValue.name.trim(),
      price: formValue.price,
      category: formValue.category,
      stock: formValue.stock
    };

    if (!updatedProduct.name) {
      this.form.get('name')?.setErrors({ required: true });
      this.form.get('name')?.markAsTouched();
      return;
    }

    this.store.dispatch(
      ProductActions.updateProduct({ product: updatedProduct })
    );

    this.toastr.success('Saved Successfully');
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}