import React, { useEffect, useState } from 'react'
import Card from '../Ui/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];



const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {

            const response = await fetch('https://react-http-34373-default-rtdb.firebaseio.com/meals/meals.json');
            if (!response.ok) {
                throw new Error('Something Went Wrong try later !')
            }
            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,

                })
            };
            setMeals(loadedMeals);
            setIsLoading(false);

        };
        // try {
        //     fetchMeals().catch(error);
        // } catch (error) {
        //     setIsLoading(false);
        //     setError(error.message)
        // }
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setError(error.message)
        })

    }, []);

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>
    };
    if (error) {
        return <section className={classes.mealsError}>
            <p>{error}</p>
        </section>
    }

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>

        </section>
    )
}

export default AvailableMeals
