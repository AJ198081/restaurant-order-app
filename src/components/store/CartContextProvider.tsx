import React, {useReducer} from "react";
import CartContext, {cartContextDefaultValue, CartContextType, item} from "./cart-context";

interface CartContextProviderProps {
    children: React.ReactNode;
}

const initialCartState = {
    items: [] as item[],
    totalAmount: 0
};

interface CartStateType {
    items: item[];
    totalAmount: number;
}

const cartStateReducer = (state: CartStateType, action: React.ReducerAction<CartStateType>) => {
    return initialCartState;


    }
;
const CartContextProvider = ({children}: CartContextProviderProps) => {

    const [cartState, dispatchCart] = useReducer(cartStateReducer, initialCartState);

    const addItemHandler = (item: item) => {
        dispatchCart({type: 'ADD', payload: item})
    };

    const removeItemHandler = (id: string) => {

    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler

    } as CartContextType;


    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>;

}

export default CartContextProvider;