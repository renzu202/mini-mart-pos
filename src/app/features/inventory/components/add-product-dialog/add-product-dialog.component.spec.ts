import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { provideToastr } from 'ngx-toastr';


describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductDialogComponent],
      providers: [
        provideMockStore({}),
        provideToastr(),
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
