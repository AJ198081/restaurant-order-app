import React, {Fragment} from "react";
// @ts-ignore
import meals from '../../assets/meals.jpg';
// @ts-ignore
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

interface HeaderProps {

}

interface HeaderProps {
    onShowCart: () => void;
}

const Header = ({ onShowCart }: HeaderProps): JSX.Element => {

    return <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={meals} alt="Table full of delicious meals!!"/>
        </div>
    </Fragment>;
}

export default Header;