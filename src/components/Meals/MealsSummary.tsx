// @ts-ignore
import classes from './MealsSummary.module.css';

interface MealsSummaryProps {

}

const MealsSummary = ({}: MealsSummaryProps) => {

    return <section className={classes.summary}>
        <h2>Delicious Food, delivered to you</h2>
        <p>Choose meals</p>
        <p>Extra meals</p>
    </section>;
}

export default MealsSummary;