// @ts-ignore
import classes from './MealItem.module.css';
import MealItemForm from "./MealItemForm";

export interface MealItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
}

const MealItem = ({id, name, description, price}: MealItemProps): JSX.Element => {


    return (<li className={classes.meal}>
        <div>
            <h3>{name}</h3>
            <div className={classes.description}>{description}</div>
            <div className={classes.price}>{`$${price.toFixed(2)}`}</div>
        </div>
        <div>
            <MealItemForm id={id}/>
        </div>
    </li>);
}

export default MealItem;