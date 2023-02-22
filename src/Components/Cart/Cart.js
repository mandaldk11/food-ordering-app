import React, { useContext, useState } from 'react'
import Modal from '../Ui/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import CartContext from '../../store/CartContext'
import CheckOut from './CheckOut'
const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.amounts.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const orderHandler = () => {
    setIsCheckOut(true)
  }
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch('https://react-http-34373-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })

    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems = <ul className={classes['cart-items']}>
    {
      cartCtx.items.map((item) =>
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />)
    }
  </ul>
  const cartModalContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckOut && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckOut && <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>}

  </React.Fragment>

  const isSubmittingModalContent = <p>sending order data...</p>
  const didSubmittingModalContent = <React.Fragment>
    <p>Successfully send the order...</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>close</button>
    </div>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittingModalContent}
    </Modal>
  );
}

export default Cart
