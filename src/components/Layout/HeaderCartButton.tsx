import CartIcon from "../Cart/CartIcon";
// @ts-ignore
import classes from './HeaderCartButton.module.css';
import {useContext} from "react";
import CartContext from "../store/cart-context";


interface HeaderCartButtonProps {

}

interface HeaderCartButtonProps {
    onClick: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps): JSX.Element=> {

    const cartContext = useContext(CartContext);

    const totalItemsInCart = cartContext.items.reduce((total, currentValue) => {
        return total + currentValue.number;
    }, 0);

    return <button className={classes.button} onClick={() => onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalItemsInCart}</span>
    </button>;

}

export default HeaderCartButton;