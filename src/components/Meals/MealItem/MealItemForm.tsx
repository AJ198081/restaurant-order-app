// @ts-ignore
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";

interface MealItemFormProps {
    id: string;
}

const MealItemForm = ({id}: MealItemFormProps): JSX.Element => {

    return <form className={classes.form}>
        <Input label={"Amount"}
               input={{id: `amount_${id}`, type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'}}/>
        <button type={"submit"}>+ Add</button>
    </form>;
}

export default MealItemForm;