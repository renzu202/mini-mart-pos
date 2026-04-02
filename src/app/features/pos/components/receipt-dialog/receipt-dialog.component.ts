import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReceiptData } from '../../models/receipt-data';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-receipt-dialog',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './receipt-dialog.component.html',
  styleUrl: './receipt-dialog.component.css'
})
export class ReceiptDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReceiptData,
    private dialogRef: MatDialogRef<ReceiptDialogComponent>,
  ) {

  }

  get paymentMethodLabel(): string {
    switch (this.data.paymentMethod) {
      case 'cash':
        return 'Cash';
      case 'debit_card':
        return 'Debit Card';
      case 'digital_wallet':
        return 'Digital Wallet';
      default:
        return '';
    }
  }

  printReceipt(): void {
    window.print();
  }

  newTransaction(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}