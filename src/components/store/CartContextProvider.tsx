import React, {useReducer} from "react";
import CartContext, {CartContextType, item} from "./cart-context";

interface CartContextProviderProps {
    children: React.ReactNode;
}

interface CartStateType {
    items: item[];
    totalAmount: number;
}

const initialCartState = {
    items: [] as item[],
    totalAmount: 0
} as CartStateType;

type Action = {
    type: 'ADD';
    payload: item;
} | {
    type: 'REMOVE';
    payload: string;
}

const cartReducer = (state: CartStateType, action: Action) => {

    const {type, payload} = action as {type: string, payload: item};

    switch (type) {
        case 'ADD':
            const updatedItems = {...state.items, payload};
            const updatedTotalAmount = state.totalAmount + payload.price * payload.number;
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
    }

    return initialCartState;
};

const CartContextProvider = ({children}: CartContextProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const addItemHandler = (itemToBeAdded: item) => {

        dispatch({type: 'ADD', payload: itemToBeAdded})
    };

    const removeItemHandler = (id: string) => {

        dispatch({type: 'REMOVE', payload: id})

    };

    const cartContext = {
        items: initialCartState.items,
        totalAmount: initialCartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler

    } as CartContextType;


    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>;

}

export default CartContextProvider;