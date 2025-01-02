export interface Item {
  id: string;
  itemName: string;
  quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    lastLogInAt: Date;
    boughtItems: Item[];
    cartItems: Item[];
    cartItemCount: number;
}
