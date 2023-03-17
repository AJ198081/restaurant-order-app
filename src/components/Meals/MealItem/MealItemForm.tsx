// @ts-ignore
import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import React, {useRef, useState} from "react";

interface MealItemFormProps {
    id: string;
    onAddToCart: (enteredAmount: number) => void

}

const MealItemForm = ({id, onAddToCart}: MealItemFormProps): JSX.Element => {

    const [validAmount, setValidAmount] = useState<boolean>(true);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        amountInputRef.current && (amountInputRef.current.value.trim().length === 0 ||
        parseInt(amountInputRef.current.value) < 1)
            ? setValidAmount(false)
            : setValidAmount(true);

        const enteredAmount = amountInputRef.current && parseInt(amountInputRef.current.value);

        enteredAmount && onAddToCart(enteredAmount);

    }

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef}
               label={"Amount"}
               input={{
                   id: `amount_${id}`,
                   type: 'number',
                   min: '1',
                   max: '5',
                   step: '1',
                   defaultValue: '1'
               }}/>
        <button type={"submit"}>+ Add</button>
        {!validAmount && <p>Please enter a valid amount, greater than 1.</p>}
    </form>;
}

export default MealItemForm;