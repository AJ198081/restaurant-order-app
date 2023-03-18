// @ts-ignore
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";
import {useContext} from "react";

export interface MealItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
}

const MealItem = ({id, name, description, price}: MealItemProps): JSX.Element => {

    const context = useContext(CartContext);

    const onAddToCart = (amount: number): void => {
        context.addItem({
            id: id,
            name: name,
            price: price,
            number: amount
        });
    }

    return (<li className={classes.meal}>
        <div>
            <h3>{name}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
        </div>
        <div>
            <MealItemForm id={id} onAddToCart={onAddToCart}/>
        </div>
    </li>);
}

export default MealItem;