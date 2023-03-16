// @ts-ignore
import classes from './Input.module.css';
import React from "react";

interface InputProps {
    label: string;
    input: {
        id: string;
        type: 'number' | 'text' | 'email' | 'password';
        min?: string;
        max?: string;
        step?: string;
        defaultValue?: string;
    };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({label, input}: InputProps, ref): JSX.Element => {

    return <div className={classes.input}>
        <label htmlFor={input.id}>{label}</label>
        <input {...input} ref={ref}/>
    </div>;
})

export default Input;