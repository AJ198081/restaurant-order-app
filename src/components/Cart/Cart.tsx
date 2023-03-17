// @ts-ignore
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import {useContext} from "react";

interface CartProps {
    onClose: () => void
}

const Cart = ({onClose}: CartProps) => {

    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    const hasItems = cartContext.items.length > 0;

    const cartItems = (cartContext.items
        .map(item => {
            return <li key={item.id}>{item.name}</li>;
        }));

    return (<Modal onClick={onClose}>
        <ul className={classes['cart-items']}>{cartItems}</ul>

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