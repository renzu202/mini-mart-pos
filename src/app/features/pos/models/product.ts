export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: 'drinks' | 'snacks' | 'instant' | 'essentials';
  image: string;
}
