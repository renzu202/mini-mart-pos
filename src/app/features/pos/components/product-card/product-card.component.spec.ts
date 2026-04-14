import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

      const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      stock: 10,
      category: 'drinks',
      image: 'sample.png'
    };

    component.product = mockProduct;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToCart when button clicked', () => {
    spyOn(component, 'addToCart');

    const productCard = fixture.nativeElement.querySelector('.product-card');
    productCard.click();

    expect(component.addToCart).toHaveBeenCalled();
  })
});
