// @ts-ignore
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import React, {useRef} from "react";

interface MealItemFormProps {
    id: string;
}

const MealItemForm = ({id}: MealItemFormProps): JSX.Element => {

    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input label={"Amount"}
               input={{
                   id: `amount_${id}`,
                   ref: {amountInputRef},
                   type: 'number',
                   min: '1',
                   max: '5',
                   step: '1',
                   defaultValue: '1'
               }}/>
        <button type={"submit"}>+ Add</button>
    </form>;
}

export default MealItemForm;