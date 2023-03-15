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
    removeItem: (id: string) => void
}

export const cartContextDefaultValue = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
} as CartContextType;

const CartContext = createContext(cartContextDefaultValue);

export default CartContext;