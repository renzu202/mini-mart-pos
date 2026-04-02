export interface AvailableProduct {
  name: string;
  image: string;
  category: 'drinks' | 'snacks' | 'instant' | 'essentials';
}

export const AVAILABLE_PRODUCTS: AvailableProduct[] = [
  { name: 'Sprite', image: 'sprite.png', category: 'drinks' },
  { name: 'Mountain Dew', image: 'mountain-dew.png', category: 'drinks' },
  { name: 'Corn Chips', image: 'corn-chips.png', category: 'snacks' },
  { name: 'Crackers', image: 'crackers.png', category: 'snacks' },
  { name: 'Cup Soup', image: 'cup-soup.png', category: 'instant' },
  { name: 'Milk Coffee', image: 'milk-coffee.png', category: 'instant' },
  { name: 'Laundry Soap', image: 'laundry-soap.png', category: 'essentials' },
  { name: 'Dishwashing Liquid', image: 'dishwashing-liquid.png', category: 'essentials' }
];