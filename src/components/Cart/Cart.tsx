// @ts-ignore
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext, {item} from "../store/cart-context";
import {useContext} from "react";
import CartItem from "./CartItem";

interface CartProps {
    onClose: () => void
}

const Cart = ({onClose}: CartProps) => {

    const cartContext = useContext(CartContext);

    const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = (item: item) => {
        console.log('remove', {...item, number: 1})
        cartContext.removeItem({...item, number: 1});
    }

    const cartItemAddHandler = (item: item) => {
        console.log('add', item);
        cartContext.addItem({...item, number: 1});
    }

    return (<Modal onClick={onClose}>
        <ul className={classes['cart-items']}>
            {cartContext.items.map((cartItem) => (
                <CartItem key={cartItem.id} name={cartItem.name} price={cartItem.price}
                          amount={cartItem.number}
                          onAdd={cartItemAddHandler.bind(null, cartItem)}
                          onRemove={cartItemRemoveHandler.bind(null, cartItem)}/>
            ))}
        </ul>

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>

        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>);
}

export default Cart;