import CartIcon from "../Cart/CartIcon";
// @ts-ignore
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../store/cart-context";

interface HeaderCartButtonProps {
    onClick: () => void
}

const HeaderCartButton = ({ onClick }: HeaderCartButtonProps): JSX.Element=> {

    const cartContext = useContext(CartContext);
    const [animated, setAnimated] = useState<boolean>(false);

    const totalItemsInCart = cartContext.items.reduce((total, currentValue) => {
        return total + currentValue.number;
    }, 0);

    useEffect(() => {

        if (cartContext.items.length === 0) {
            return;
        }

        setAnimated(true);

        const timeout = setTimeout(() => {
            setAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timeout);
        };
    }, [cartContext.items]);

    const btnClasses = `${classes.button} ${animated ? classes.bump : ''} `;

    return <button className={btnClasses} onClick={onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalItemsInCart}</span>
    </button>;
}

export default HeaderCartButton;