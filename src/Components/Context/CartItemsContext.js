import React, {createContext,useState} from 'react'
export const CartContext = createContext();

function CartItemsContext({children}) {
    const [cartItems,setCartItems] = useState([])
    const [cartLength, setCartLength] = useState(0)
  return (
     <CartContext.Provider value={{cartItems, setCartItems,cartLength,setCartLength}}>
       {children}
     </CartContext.Provider>
  )
}

export default CartItemsContext