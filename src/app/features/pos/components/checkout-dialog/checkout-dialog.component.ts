import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';

import { CartItem } from '../../models/cart-item';
import { PaymentMethod } from '../../models/payment-method';
import { ReceiptData } from '../../models/receipt-data';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import * as CartActions from '../../store/cart.actions';
import * as OrdersActions from '../../../orders/store/orders.actions'
import { ToastrService } from 'ngx-toastr';

interface CheckoutDialogData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.css'
})
export class CheckoutDialogComponent {
  paymentMethods: { value: PaymentMethod; label: string }[] = [
    { value: 'cash', label: 'Cash' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'digital_wallet', label: 'Digital Wallet' }
  ];

  form = new FormGroup({
    paymentMethod: new FormControl<PaymentMethod>('cash', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    amountReceived: new FormControl<number | null>(null)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CheckoutDialogData,
    private dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private dialog: MatDialog,
    private store: Store,
    private toastr: ToastrService
  ) {
    this.updateCashValidation();
    this.form.controls.paymentMethod.valueChanges.subscribe(() => {
      this.updateCashValidation();
    });
  }

  get isCash(): boolean {
    return this.form.controls.paymentMethod.value === 'cash';
  }

  get amountReceived(): number {
    return Number(this.form.controls.amountReceived.value ?? 0);
  }

  get change(): number {
    if (!this.isCash) return 0;
    const value = this.amountReceived - this.data.total;
    return value > 0 ? value : 0;
  }

  get insufficientCash(): boolean {
    return this.isCash && this.amountReceived < this.data.total;
  }

  private updateCashValidation(): void {
    const amountControl = this.form.controls.amountReceived;

    if (this.isCash) {
      amountControl.setValidators([Validators.required, Validators.min(this.data.total)]);
    } else {
      amountControl.clearValidators();
      amountControl.setValue(null);
    }

    amountControl.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid || this.insufficientCash) {
      this.form.markAllAsTouched();
      return;
    }

    const receiptData: ReceiptData = {
      orderId: crypto.randomUUID(),
      items: this.data.items,
      subtotal: this.data.subtotal,
      tax: this.data.tax,
      total: this.data.total,
      paymentMethod: this.form.controls.paymentMethod.value,
      amountReceived: this.isCash ? this.amountReceived : undefined,
      change: this.isCash ? this.change : undefined,
      transactionDate: new Date().toLocaleString()
    };

    this.store.dispatch(CartActions.clearCart());
    this.store.dispatch(OrdersActions.addOrder({ order: receiptData }));
    this.toastr.success('Payment succesfull');

    this.dialogRef.close();

    this.dialog.open(ReceiptDialogComponent, {
      width: '560px',
      disableClose: true,
      data: receiptData
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}