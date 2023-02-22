import React, { useContext } from 'react'
import MealItemForm from './MealItemForm'
import classes from './MealItem.module.css'
import CartContext from '../../../store/CartContext'
const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price}`;
    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            amount: amount,
            price: props.price,
            name: props.name
        });
    }
    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem
