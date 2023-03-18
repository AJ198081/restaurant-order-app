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
    type: 'ADD' | 'REMOVE';
    payload: item;
}

const cartReducer = (state: CartStateType, action: Action) => {

        const {type, payload} = action as { type: string, payload: item };

        let updatedItems: item[];
        let updatedItem: item;
        let updatedTotalAmount;

        switch (type) {

            case 'ADD':
                const existingItemIndex = state.items.findIndex(item => item.id === payload.id);


                if (existingItemIndex !== -1) {
                    const existingItem = state.items[existingItemIndex];
                    updatedItem = {
                        ...existingItem,
                        number: existingItem.number + payload.number
                    }
                    updatedItems = [...state.items]
                    updatedItems[existingItemIndex] = updatedItem;
                } else {
                    updatedItems = [...state.items, payload]
                }

                updatedTotalAmount = state.totalAmount + (payload.price * payload.number);

                return {
                    items: updatedItems,
                    totalAmount: updatedTotalAmount,
                };

            case 'REMOVE':

                const indexOfExistingItem = state.items.findIndex(item => item.id === payload.id);

                if (indexOfExistingItem !== -1) {
                    const existingItem = state.items[indexOfExistingItem];

                    if ((existingItem.number - payload.number) >= 1) {
                        updatedItem = {
                            ...existingItem,
                            number: existingItem.number - payload.number
                        }
                        updatedItems = [...state.items];
                        updatedItems[indexOfExistingItem] = updatedItem;
                    } else {
                        updatedItems = state.items.filter(item => item.id !== payload.id);
                    }

                    updatedTotalAmount = state.totalAmount - (payload.number * payload.price);

                    return {
                        items: updatedItems,
                        totalAmount: updatedTotalAmount
                    }
                }

                return {...state};
            default:
                console.log('Error with the entered type');
        }

        return initialCartState;
    }
;

const CartContextProvider = ({children}: CartContextProviderProps) => {

    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    const addItemHandler = (itemToBeAdded: item) => {
        dispatch({type: 'ADD', payload: itemToBeAdded})
    };

    const removeItemHandler = (itemToBeRemoved: item) => {
        dispatch({type: 'REMOVE', payload: itemToBeRemoved})
    };

    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    } as CartContextType;


    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>;

}

export default CartContextProvider;