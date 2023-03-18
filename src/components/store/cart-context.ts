import {createContext} from "react";

export interface item {
    id: string;
    name: string;
    price: number;
    number: number;
}

export interface CartContextType {
    items: item[];
    totalAmount: number;
    addItem: (item: item) => void
    removeItem: (item: item) => void
}

export const cartContextDefaultValue = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (item) => {},
} as CartContextType;

const CartContext = createContext(cartContextDefaultValue);

export default CartContext;