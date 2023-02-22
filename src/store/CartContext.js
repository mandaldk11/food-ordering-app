import { createContext } from 'react'
const CartContext = createContext({
    items: [],
    amounts: 0,
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
})

export default CartContext;
