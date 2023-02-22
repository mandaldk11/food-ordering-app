import React, { Fragment } from 'react'
import mealsImg from '../../Assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'
const Header = props => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Meal's.com</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImg} alt='a table full of delicious food' />
            </div>
        </Fragment>
    )
}

export default Header
