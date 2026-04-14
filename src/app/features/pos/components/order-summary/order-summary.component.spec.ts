import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideToastr } from 'ngx-toastr';
import { OrderSummaryComponent } from './order-summary.component';
import { of } from 'rxjs';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSummaryComponent],
      providers: [
        provideMockStore({}),
        provideToastr()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display subtotal, tax, ad total', () => {
    component.subtotal$ = of(100);
    component.tax$ = of(3);
    component.total$ = of(103);

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('₱100.00');
    expect(text).toContain('₱3.00');
    expect(text).toContain('₱103.00');
  });

  it('should call openCheckoutDialog when checkout button is clicked', () => {
  spyOn(component, 'openCheckoutDialog');

  const button = fixture.nativeElement.querySelector('.checkout-btn');
  button.click();

  expect(component.openCheckoutDialog).toHaveBeenCalled();
  });


});
