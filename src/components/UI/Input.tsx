// @ts-ignore
import classes from './Input.module.css';
import React, {RefObject} from "react";

interface InputProps {
    label: string;
    input: {
        id: string;
        ref: RefObject<HTMLInputElement>;
        type: 'number' | 'text' | 'email' | 'password';
        min?: string;
        max?: string;
        step?: string;
        defaultValue?: string;
    };
}

const Input = (props: InputProps) => {

    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input}/>
    </div>;
}

export default Input;