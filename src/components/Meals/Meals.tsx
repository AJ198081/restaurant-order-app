import {Fragment} from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

interface MealsProps {

}

const Meals = ({}: MealsProps) => {

    return (<Fragment>
        <MealsSummary/>
        <AvailableMeals />
    </Fragment>);
}

export default Meals;