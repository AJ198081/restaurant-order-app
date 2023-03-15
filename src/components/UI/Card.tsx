// @ts-ignore
import classes from './Cards.module.css';
import React from "react";

interface CardProps {
    children: React.ReactNode;
}

const Card = ({children}: CardProps) => {

    return <div className={classes.card}>
        {children}
    </div>
}


export default Card;