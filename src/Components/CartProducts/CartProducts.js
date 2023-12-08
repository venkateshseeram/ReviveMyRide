import React, { useContext } from 'react'
import IndividualCartProduct from '../IndividualCartProduct/IndividualCartProduct'
import { CartContext } from '../Context/CartItemsContext'

function CartProducts() {
  const {cartItems, setCartItems} = useContext(CartContext)
  return cartItems.map((cartProduct)=>
 (<IndividualCartProduct key={cartProduct.id} cartProduct={cartProduct}></IndividualCartProduct>)
    )
}

export default CartProducts