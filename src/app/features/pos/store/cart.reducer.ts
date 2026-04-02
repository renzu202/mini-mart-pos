import { createReducer, on } from "@ngrx/store";
import { initialCartState } from "./cart.state";
import * as CartAction from "./cart.actions";

export const cartReducer = createReducer(
  initialCartState,

  on(CartAction.addToCart, (state, {product}) => {

    const existingItem = state.items.find(item => item.id === product.id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1}
            : item
        )
      };
    }

    return{
      ...state,
      items: [...state.items, { ...product, quantity: 1}]
    };
  }),

  on(CartAction.increaseQuantity, (state, {productId}) => ({
    ...state,
    items: state.items.map(item =>
      item.id === productId
        ? {...item, quantity: item.quantity + 1}
        : item
    )
  })),

  on(CartAction.decreaseQuantity, (state, {productId}) => ({
    ...state,
    items: state.items.map(item =>
      item.id === productId
      ? {...item, quantity: item.quantity - 1}
      : item
    ).filter(item => item.quantity > 0)
  })),

  on(CartAction.removeFromCart, (state, {productId}) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId)
  })),

  on(CartAction.clearCart, state => ({
    ...state,
    items: []
  })),


)