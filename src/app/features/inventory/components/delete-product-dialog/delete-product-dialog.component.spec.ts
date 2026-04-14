import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteProductDialogComponent } from './delete-product-dialog.component';
import { provideMockStore } from '@ngrx/store/testing';
import { provideToastr } from 'ngx-toastr';

describe('DeleteProductDialogComponent', () => {
  let component: DeleteProductDialogComponent;
  let fixture: ComponentFixture<DeleteProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductDialogComponent],
      providers: [
        provideMockStore({}),
        provideToastr(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
