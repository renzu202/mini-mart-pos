import { createReducer, on } from "@ngrx/store";
import { initialProductState } from "./product.state";
import * as ProductActions from "./product.actions";

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),

  on(ProductActions.decreaseStock, (state, { productId }) => ({
    ...state,
    products: state.products.map(product =>
      product.id === productId
        ? { ...product, stock: product.stock - 1 }
        : product
    )
  })),

  on(ProductActions.increaseStock, (state, { productId }) => ({
    ...state,
    products: state.products.map(product =>
      product.id === productId
        ? { ...product, stock: product.stock + 1 }
        : product
    )
  })),

  on(ProductActions.restoreStockBulk, (state, { items }) => ({
    ...state,
    products: state.products.map(product => {
      const found = items.find(i => i.id === product.id);
      return found
        ? { ...product, stock: product.stock + found.quantity }
        : product;
    })
  })),

  on(ProductActions.restoreStock, (state, { item }) => ({
    ...state,
    products: state.products.map(product =>
      product.id === item.id
        ? { ...product, stock: product.stock + item.quantity }
        : product
    )
  })),

  on(ProductActions.addProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(ProductActions.updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map(p =>
      p.id === product.id ? { ...product } : p
    )
  })),

  on(ProductActions.deleteProduct, (state, { productId }) => ({
    ...state,
    products: state.products.filter(p => p.id !== productId)
  })),

);