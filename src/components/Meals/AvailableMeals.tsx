// @ts-ignore
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem, {MealItemProps} from "./MealItem/MealItem";
import {useEffect, useState} from "react";
import axios, {AxiosError, CanceledError} from "axios";

interface AvailableMealsProps {
}

const baseUrl = 'http://localhost:3500/meals';

function fetchAllMeals(abortController: AbortController, setMeals: (value: (((prevState: MealItemProps[]) => MealItemProps[]) | MealItemProps[])) => void, setIsLoading: (value: (((prevState: boolean) => boolean) | boolean)) => void, setError: (value: (((prevState: (AxiosError<unknown, any> | string | null | undefined)) => (AxiosError<unknown, any> | string | null | undefined)) | AxiosError<unknown, any> | string | null | undefined)) => void) {
    axios.get(baseUrl, {
        headers: {
            'Accept': 'application/json'
        },
        signal: abortController.signal
    })
         .then(response => {
             setMeals(response.data as MealItemProps[]);
             setIsLoading(false);
         })
         .catch(e => {
             setIsLoading(false);

             if (e instanceof CanceledError) {
                 return;
             } else if (e instanceof AxiosError) {
                 setError(e.code
                              ? e.code
                              : e);
             } else {
                 setError(e);
                 throw Error(e);
             }
         });
}

const AvailableMeals = ({}: AvailableMealsProps): JSX.Element => {

    const [meals, setMeals] = useState<MealItemProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | string | null | undefined>(null);

    useEffect(() => {
        const abortController = new AbortController();

        setIsLoading(true);

        fetchAllMeals(abortController, setMeals, setIsLoading, setError);

        return () => {
            abortController.abort('Cancelled by abort abortController');
        }
    }, []);

    const mealsList = meals.map(meal => {
        return (
            <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
        )
    })

    return <section className={classes.meals}>
        <Card>
            <ul>
                {isLoading
                    ? <p className={classes.MealsLoading}>Data is being fetched</p>
                    :  error !== null
                        ? <p style={{
                            color: 'red',
                            textAlign: "center"
                        }}>{error!.toString()}</p>

                        : mealsList}
            </ul>
        </Card>
    </section>;
}

export default AvailableMeals;