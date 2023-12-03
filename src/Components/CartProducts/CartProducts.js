import React from 'react'
import IndividualCartProduct from '../IndividualCartProduct/IndividualCartProduct'

function CartProducts({cartProductsData}) {
  return cartProductsData.map((cartProduct)=>
 (<IndividualCartProduct key={cartProduct.id} cartProduct={cartProduct}></IndividualCartProduct>)
    )
}

export default CartProducts