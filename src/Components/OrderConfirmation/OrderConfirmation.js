import React from 'react'

function OrderConfirmation() {
 const {cartItems, setCartItems} = useContext(CartContext)
  return (<>
    <div>!!Your order has been succesfully placed!!</div>
    <div>Below are your order details</div>
    </>
  )
}

export default OrderConfirmation