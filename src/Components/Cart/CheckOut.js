import React, { useRef, useState } from 'react'
import classes from './CheckOut.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 6;
const CheckOut = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChar(enteredPostalCode);

        setFormInputValidity({
            name: enteredCityIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;
        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostalCode,
        })
    }

    const nameControlClasses=`${classes.control} ${formInputValidity.name ? '' : classes.invalid}`;
    const streetControlClasses=`${classes.control} ${formInputValidity.street ? '' : classes.invalid}`;
    const cityControlClasses=`${classes.control} ${formInputValidity.city ? '' : classes.invalid}`;
    const postalCodeControlClasses=`${classes.control} ${formInputValidity.postalCode ? '' : classes.invalid}`;
    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValidity.name && <p>*please enter a valid Name !</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputValidity.street && <p>*please enter a valid street name !</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'> postal-Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputValidity.postalCode && <p>*please enter a valid postal code (minimum 5 characters long) !</p>}
            </div>
            <div className={ cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputValidity.city && <p>*please enter a valid city !</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOut
