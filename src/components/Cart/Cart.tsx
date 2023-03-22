// @ts-ignore
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext, {item} from "../store/cart-context";
import {useContext, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

interface CartProps {
    onClose: () => void
}

const Cart = ({onClose}: CartProps) => {

    const cartContext = useContext(CartContext);
    const hasItems = cartContext.items.length > 0;
    const [checkout, setCheckout] = useState<boolean>(false);

    const totalAmount = `$${Math.abs(cartContext.totalAmount)
                                .toFixed(2)}`;

    const cartItemRemoveHandler = (item: item) => {
        cartContext.removeItem({...item, number: 1});
    }

    const cartItemAddHandler = (item: item) => {
        cartContext.addItem({...item, number: 1});
    }

    const orderHandler = () => {
        setCheckout(true);
    };


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
        {checkout && <Checkout onCancel={onClose}/>}
        {!checkout && <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>}
    </Modal>);
}

export default Cart;