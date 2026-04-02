import { Product } from "../models/product";

export const PRODUCTS: Product[] = [
  // 🥤 Drinks
  { id: 1, name: 'Coca-Cola', price: 25, stock: 5 ,category: 'drinks', image: 'coke.png' },
  { id: 2, name: 'Pepsi', price: 25, stock: 5 ,category: 'drinks', image: 'pepsi.png' },
  { id: 3, name: 'Bottled Water', price: 15, stock: 5 ,category: 'drinks', image: 'water.png' },
  { id: 4, name: 'Orange Juice', price: 30, stock: 5 ,category: 'drinks', image: 'juice.png' },
  { id: 5, name: 'Iced Tea', price: 20, stock: 5 ,category: 'drinks', image: 'iced-tea.png' },

  // 🍟 Snacks
  { id: 6, name: 'Potato Chips', price: 20, stock: 5 ,category: 'snacks', image: 'chips.png' },
  { id: 7, name: 'Chocolate Bar', price: 35, stock: 5 ,category: 'snacks', image: 'chocolate.png' },
  { id: 8, name: 'Biscuits', price: 18, stock: 5 ,category: 'snacks', image: 'biscuits.png' },
  { id: 9, name: 'Candies', price: 10, stock: 5 ,category: 'snacks', image: 'candies.png' },
  { id: 10, name: 'Popcorn', price: 25, stock: 5 ,category: 'snacks', image: 'popcorn.png' },

  // 🍜 Instant Meals
  { id: 11, name: 'Cup Noodles', price: 35, stock: 5 ,category: 'instant', image: 'noodles.png' },
  { id: 12, name: 'Instant Coffee', price: 12, stock: 5 ,category: 'instant', image: 'coffee.png' },
  { id: 13, name: 'Oatmeal', price: 28, stock: 5 ,category: 'instant', image: 'oatmeal.png' },
  { id: 14, name: 'Canned Tuna', price: 45, stock: 5 ,category: 'instant', image: 'tuna.png' },

  // 🧴 Essentials
  { id: 15, name: 'Toothpaste', price: 50, stock: 5 ,category: 'essentials', image: 'toothpaste.png' },
  { id: 16, name: 'Shampoo', price: 8, stock: 5 ,category: 'essentials', image: 'shampoo.png' },
  { id: 17, name: 'Soap', price: 20, stock: 5 ,category: 'essentials', image: 'soap.png' },
  { id: 18, name: 'Tissue', price: 15, stock: 5 ,category: 'essentials', image: 'tissue.png' },
];