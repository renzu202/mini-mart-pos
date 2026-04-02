import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './features/pos/store/cart.reducer';
import { ordersReducer } from './features/orders/store/orders.reducer';
import { productReducer } from './features/pos/store/product.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr({
      timeOut: 1800,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    provideAnimations(),
    provideStore({
      cart: cartReducer,
      orders: ordersReducer,
      products: productReducer
    })
  ]
};
