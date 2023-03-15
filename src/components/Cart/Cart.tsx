// @ts-ignore
import classes from './Cart.module.css';
import Modal from "../UI/Modal";

interface CartProps {
    onClose: () => void
}

const Cart = ({onClose}: CartProps) => {

    const cartItems = [
        {id: 'c1', name: 'Sushi', amount: 2, price: 12.99}
    ].map(item => <li key={item.id}>{item.name}</li>);

    return (<Modal onClick={onClose}>
        <ul className={classes['cart-items']}>{cartItems}</ul>

        <div className={classes.total}>
            <span>Total Amount</span>
            <span>35.62</span>
        </div>

        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={onClose}>Close</button>
            <button className={classes.button}>Order</button>
        </div>

    </Modal>);
}

export default Cart;