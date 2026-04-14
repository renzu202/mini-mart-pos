import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PosComponent } from './pos.component';
import { provideToastr } from 'ngx-toastr';

describe('PosComponent', () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosComponent],
      providers: [
        provideMockStore({}),
        provideToastr()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
