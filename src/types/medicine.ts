export interface Medicine {
  id: string;
  name: string;
  price: number;
  unit: string;
  stock: number;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

